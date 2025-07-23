const fs = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const Tour = require("../../Models/tourModel");
// const Shift = require("../Models/shiftModel");
// const Department = require("../Models/departmentModel");
// const Employee = require("../Models/employeeModel");
const Account = require("../Models/accountModel");
// const Report = require("../Models/reportModel");

dotenv.config({ path: "./config.env" });

// console.log(process.env);
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Database connected successfully!!!");
  });
// const Accounts = JSON.parse(
//   fs.readFileSync(`${__dirname}/UsersData.json`, "utf-8")
// );

// const importData = async () => {
//   try {
//     // Iterate over each account in the JSON data
//     for (const accountData of Accounts) {
//       console.log(`Processing account for userName: ${accountData.userName}`);

//       // 1) Validate that the employee ID is provided and exists
//       const employeeId = accountData.employee;
//       if (!employeeId) {
//         console.log(
//           `Error: An employee ID must be provided for userName: ${accountData.userName}`
//         );
//         continue; // Skip to the next account
//       }

//       const employee = await Employee.findById(employeeId);
//       if (!employee) {
//         console.log(
//           `Error: Employee not found for userName: ${accountData.userName}, employeeId: ${employeeId}`
//         );
//         continue; // Skip to the next account
//       }

//       // 2) Check if the employee already has an account
//       if (employee.account) {
//         console.log(
//           `Error: Employee already has an associated account for userName: ${accountData.userName}, employeeId: ${employeeId}`
//         );
//         continue; // Skip to the next account
//       }

//       // 3) Create the Account
//       const newAccount = await Account.create({
//         userName: accountData.userName,
//         password: accountData.password,
//         passwordConfirm: accountData.passwordConfirm,
//         passwordChangedAt: accountData.passwordChangedAt,
//         role: accountData.role,
//         employee: employeeId
//       });

//       // 4) Update the Employee to link it to the Account
//       employee.account = newAccount._id;
//       await employee.save({ validateBeforeSave: false });

//       console.log(
//         `Successfully created account for userName: ${accountData.userName}`
//       );
//     }

//     console.log("All data successfully loaded!!!");
//   } catch (err) {
//     console.log("Error importing data:", err);
//   } finally {
//     process.exit();
//   }
// };
const Accounts = JSON.parse(
  fs.readFileSync(`${__dirname}/UsersData.json`, "utf-8")
);

const importData = async () => {
  try {
    await Account.create(Accounts);
    console.log("Data successfully loaded!!!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Account.deleteMany();
    console.log("Data successfully deleted!!!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
