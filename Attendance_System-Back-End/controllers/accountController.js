const Account = require("../Models/accountModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Employee = require("../Models/employeeModel");

exports.getAllAccounts = catchAsync(async (req, res, next) => {
  const accounts = await Account.find();
  res
    .status(200)
    .json({ status: "success", results: accounts.length, data: { accounts } });
});
// exports.createAccount = catchAsync(async (req, res, next) => {
//   const newAccount = await Account.create(req.body);
//   res.status(201).json({ status: "success", data: { account: newAccount } });
// });
exports.getAccount = catchAsync(async (req, res, next) => {
  const account = await Account.findById(req.params.id);
  if (!account) return next(new AppError("Account not found", 404));
  res.status(200).json({ status: "success", data: { account } });
});
// exports.updateAccount = catchAsync(async (req, res, next) => {
//   const updatedAccount = await Account.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {
//       new: true,
//       runValidators: true
//     }
//   );
//   if (!updatedAccount) return next(new AppError("Account not found", 404));
//   res
//     .status(200)
//     .json({ status: "success", data: { account: updatedAccount } });
// });
exports.deleteAccount = catchAsync(async (req, res, next) => {
  const account = await Account.findById(req.params.id);
  await Employee.findByIdAndUpdate(account.employee, {
    $unset: { account: "" }
  });
  // account.active = false;
  // await account.save({ validateBeforeSave: false });
  await Account.findByIdAndDelete(req.params.id);
  if (!account) return next(new AppError("Account not found", 404));
  res.status(203).json({ status: "success", data: null });
});
