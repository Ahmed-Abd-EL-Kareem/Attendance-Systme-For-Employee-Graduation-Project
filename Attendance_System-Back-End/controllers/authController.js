const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Account = require("../Models/accountModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Employee = require("../Models/employeeModel");

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN.trim()
  });
};
// const createSendToken = async (account, statusCode, res) => {
//   const token = signToken(account._id);

//   // Log the NODE_ENV to debug
//   console.log("NODE_ENV:", process.env.NODE_ENV);

//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
//   };

//   // Log the cookie options to verify
//   console.log("Cookie Options:", cookieOptions);

//   res.cookie("jwt", token, cookieOptions);

//   account.password = undefined;
//   res.status(statusCode).json({
//     status: "success",
//     token,
//     data: { account }
//   });
// };
const createSendToken = async (account, statusCode, res) => {
  const token = signToken(account._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    sameSite: "None" // Set to 'None' to allow cross-site cookies
    // secure: req.secure || req.headers["x-forwarded-proto"] === "https"
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  // Remove password from output
  account.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { account }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // 1) Validate that the employee ID is provided and exists
  const employeeId = req.body.employee;
  if (!employeeId) {
    return next(
      new AppError("An employee ID must be provided to create an account", 400)
    );
  }

  const employee = await Employee.findById(employeeId);
  if (!employee) {
    return next(new AppError("Employee not found", 404));
  }

  // 2) Check if the employee already has an account
  if (employee.account) {
    return next(
      new AppError("This employee already has an associated account", 400)
    );
  }

  // 3) Create the Account
  const newAccount = await Account.create({
    userName: req.body.userName,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
    employee: employeeId
  });

  // 4) Update the Employee to link it to the Account
  employee.account = newAccount._id;
  await employee.save({ validateBeforeSave: false });

  // const newAccount = await Account.create({
  //   userName: req.body.userName,
  //   password: req.body.password,
  //   passwordConfirm: req.body.passwordConfirm,
  //   passwordChangedAt: req.body.passwordChangedAt,
  //   role: req.body.role,
  //   employee: req.body.employee
  // });
  // 5) Send the token
  res.status(201).json({
    status: "success",
    data: {
      account: newAccount
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return next(new AppError("Please provide userName and password!", 400));
  }

  const account = await Account.findOne({ userName }).select("+password");

  if (
    !account ||
    !(await account.correctPassword(password, account.password))
  ) {
    return next(new AppError("Incorrect userName or password", 401));
  }

  createSendToken(account, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token)
    return next(
      new AppError(
        "You are not logged in. Please log in to access this route.",
        401
      )
    );

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentAccount = await Account.findById(decoded.id);
  if (!currentAccount)
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );

  // 4) Check if user changed password after the token was issued
  if (currentAccount.changedPasswordAfter(decoded.iat))
    return next(
      new AppError(
        "User recently changed their password. Please log in again.",
        401
      )
    );
  // Grant access to protected route
  req.user = currentAccount;
  res.locals.user = currentAccount; // For rendering views
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const account = await Account.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (
    !(await account.correctPassword(req.body.passwordCurrent, account.password))
  )
    return next(new AppError("Your current password is wrong.", 401));

  // 3) If so, update password
  account.password = req.body.password;
  account.passwordConfirm = req.body.passwordConfirm;
  await account.save();
  // 4) Log user in, send JWT
  createSendToken(account, 200, res);
});

exports.updateAccountPassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const account = await Account.findById(req.params.id).select("+password");

  // 3) If so, update password
  account.password = req.body.password;
  account.passwordConfirm = req.body.passwordConfirm;
  await account.save();
  // 4) Log user in, send JWT
  res.status(200).json({
    status: "success",
    data: { account }
  });
});

exports.logout = (req, res) => {
  res.cookie("jwt", "Logged Out", {
    expires: new Date(Date.now() + 10 * 1000), // Cookie expires in 10 seconds
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    sameSite: "None" // Only secure in production
  });
  res.locals.user = null;
  exports.user = null;
  res.status(200).json({
    status: "success",
    message: "Logged out successfully"
  });
};
