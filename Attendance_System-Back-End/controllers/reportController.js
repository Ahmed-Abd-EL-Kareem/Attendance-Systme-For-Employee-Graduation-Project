const Report = require("../Models/reportModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeature");
const Employee = require("../Models/employeeModel");

exports.getAllReports = catchAsync(async (req, res, next) => {
  let query = Report.find();
  // Filter by departmentId
  if (req.query.departmentId) {
    const employees = await Employee.find({
      department: req.query.departmentId
    }).select("_id");

    if (!employees.length) {
      return next(
        new AppError("No employees found in the specified department", 404)
      );
    }

    const employeeIds = employees.map(emp => emp._id);
    query = query.find({ employee: { $in: employeeIds } });
  }

  // Filter by emId
  if (req.query.emId) {
    const employee = await Employee.findOne({ emId: req.query.emId }).select(
      "_id"
    );

    if (!employee) {
      return next(
        new AppError("No employee found with the specified emId", 404)
      );
    }
    query = query.find({ employee: employee._id }); // Fixed: Removed await
  }

  // Apply APIFeatures (filter, sort, limitFields, pagination)
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const reports = await features.query.populate("employee", [
    "-__v",
    "-account",
    "-report"
  ]);

  res.status(200).json({
    status: "success",
    results: reports.length,
    data: {
      reports
    }
  });
});
// exports.getAllReports = catchAsync(async (req, res, next) => {
//   // const reports = await Report.find();
//   const features = new APIFeatures(Report.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .pagination();
//   const reports = await features.query;
//   res.status(200).json({
//     status: "success",
//     results: reports.length,
//     data: {
//       reports
//     }
//   });
// });
exports.createReport = catchAsync(async (req, res, next) => {
  const newReport = await Report.create(req.body);
  if (!newReport) {
    return res.status(400).json({ message: "Invalid data" });
  }
  res.status(201).json({
    status: "success",
    data: {
      report: newReport
    }
  });
});
exports.getReport = catchAsync(async (req, res, next) => {
  // Base query: Filter reports by employee ID
  const query = Report.find({ employee: req.params.id }).populate("employee", [
    "-__v",
    "-account",
    "-report"
  ]);
  // const query = Report.findById(req.params.id);
  if (!query) {
    return next(new AppError("Report not found", 404));
  }
  // Apply APIFeatures (filter, sort, limitFields, pagination)
  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const reports = await features.query;
  res.status(200).json({
    status: "success",
    results: reports.length,
    data: {
      reports // Changed from "report" to "reports" to reflect that it's an array
    }
  });
});
exports.updateReport = catchAsync(async (req, res, next) => {
  const updateReport = await Report.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updateReport) {
    return next(new AppError("Report not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updateReport
    }
  });
});
exports.deleteReport = catchAsync(async (req, res, next) => {
  const report = await Report.findByIdAndDelete(req.params.id);
  if (!report) {
    return next(new AppError("Report not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: null
  });
});
