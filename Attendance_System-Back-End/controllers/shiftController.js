const Shift = require("../Models/shiftModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Employee = require("../Models/employeeModel");

exports.getAllShifts = catchAsync(async (req, res, next) => {
  const shifts = await Shift.find();
  res.status(200).json({
    status: "success",
    results: shifts.length,
    data: {
      shifts
    }
  });
});
exports.createShift = catchAsync(async (req, res, next) => {
  const newShift = await Shift.create(req.body);
  if (!newShift) {
    return res.status(400).json({ message: "Invalid data" });
  }
  res.status(201).json({
    status: "success",
    data: {
      shift: newShift
    }
  });
});
exports.getShift = catchAsync(async (req, res, next) => {
  const shift = await Shift.findById(req.params.id);
  if (!shift) {
    return next(new AppError("Shift not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      shift
    }
  });
});
exports.updateShift = catchAsync(async (req, res, next) => {
  const updateShift = await Shift.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updateShift) {
    return next(new AppError("Shift not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updateShift
    }
  });
});
// exports.deleteShift = catchAsync(async (req, res, next) => {
//   const shift = await Shift.findByIdAndDelete(req.params.id);
//   if (!shift) {
//     return next(new AppError("Shift not found", 404));
//   }
//   res.status(204).json({
//     status: "success",
//     data: null
//   });
// });
exports.deleteShift = catchAsync(async (req, res, next) => {
  // Check if the shift exists
  const shift = await Shift.findById(req.params.id);
  if (!shift) {
    return next(new AppError("Shift not found", 404));
  }

  // Check if there are any employees in this shift
  const employees = await Employee.find({ shift: req.params.id });
  if (employees.length > 0) {
    // Set the shift field to "Unset" for all employees in this shift
    await Employee.updateMany(
      { shift: req.params.id },
      { $set: { shift: null } } // Set the shift field to "Unset"
    );
  }

  // Delete the shift
  await Shift.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null
  });
});
