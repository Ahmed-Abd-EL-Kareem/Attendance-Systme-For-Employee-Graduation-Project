const User = require("../Models/accountModel");
const Employee = require("../Models/employeeModel");
const Department = require("../Models/departmentModel");
const Shift = require("../Models/shiftModel");
const catchAsync = require("../utils/catchAsync");

exports.dashboard = catchAsync( async(req,res,next)=>{
  const user = await User.find();
  const employee = await Employee.find();
  const department = await Department.find();
  const shift = await Shift.find();
  res.status(200).json({
    status: "success",
    data: {
      user:user.length,
      employee:employee.length,
      department: department.length,
      shift:shift.length
    }
  })
})