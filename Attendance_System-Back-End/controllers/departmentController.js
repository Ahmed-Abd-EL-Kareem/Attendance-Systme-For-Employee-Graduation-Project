const Department = require("../Models/departmentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Employee = require("../Models/employeeModel");

exports.getAllDepartments = catchAsync(async (req, res, next) => {
  const departments = await Department.find();
  res.status(200).json({
    status: "success",
    results: departments.length,
    data: {
      departments
    }
  });
});
exports.createDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      department
    }
  });
});
exports.getDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findById(req.params.id);
  if (!department) return next(new AppError("Department not found", 404));
  res.status(200).json({
    status: "success",
    data: {
      department
    }
  });
});
exports.updateDepartment = catchAsync(async (req, res, next) => {
  const updatedDepartment = await Department.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedDepartment)
    return next(new AppError("Department not found", 404));
  res.status(200).json({
    status: "success",
    data: {
      department: updatedDepartment
    }
  });
});
// exports.deleteDepartment = catchAsync(async (req, res, next) => {
//   const department = await Department.findByIdAndDelete(req.params.id);
//   if (!department) return next(new AppError("Department not found", 404));
//   res.status(204).json({
//     status: "success",
//     data: null
//   });
// });
exports.deleteDepartment = catchAsync(async (req, res, next) => {
  // Check if the department exists
  const department = await Department.findById(req.params.id);
  if (!department) {
    return next(new AppError("Department not found", 404));
  }

  // Check if there are any employees in this department
  const employees = await Employee.find({ department: req.params.id });
  if (employees.length > 0) {
    // Unset the department field for all employees in this department
    await Employee.updateMany(
      { department: req.params.id },
      { $set: { department: null } }
    );
  }

  // Delete the department
  await Department.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null
  });
});
