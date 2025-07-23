// const cloudinary = require("cloudinary");
// const Employee = require("../Models/employeeModel");
// const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/appError");
// const APIFeatures = require("../utils/apiFeature");
// const Account = require("../Models/accountModel");

// exports.getEmployeeCountsByShift = catchAsync(async (req, res, next) => {
//   const counts = await Employee.aggregate([
//     {
//       $group: {
//         _id: "$shift", // Group by the shift field
//         numEmployees: { $sum: 1 } // Count the number of employees in each shift
//       }
//     },
//     {
//       $lookup: {
//         from: "shifts", // The name of the Shift collection in MongoDB
//         localField: "_id",
//         foreignField: "_id",
//         as: "shiftDetails"
//       }
//     },
//     {
//       $unwind: "$shiftDetails" // Unwind the shift details array
//     },
//     {
//       $project: {
//         _id: 0, // Exclude the _id field from the result
//         shiftId: "$shiftDetails._id",
//         shiftStartTime: "$shiftDetails.startTime",
//         shiftEndTime: "$shiftDetails.endTime",
//         shiftStartTime12h: {
//           $cond: {
//             if: "$shiftDetails.startTime",
//             then: {
//               $let: {
//                 vars: {
//                   timeParts: { $split: ["$shiftDetails.startTime", ":"] }
//                 },
//                 in: {
//                   $let: {
//                     vars: {
//                       hours: { $toInt: { $arrayElemAt: ["$$timeParts", 0] } },
//                       minutes: { $toInt: { $arrayElemAt: ["$$timeParts", 1] } }
//                     },
//                     in: {
//                       $concat: [
//                         {
//                           $toString: {
//                             $cond: [
//                               { $eq: ["$$hours", 0] },
//                               12,
//                               { $mod: ["$$hours", 12] }
//                             ]
//                           }
//                         },
//                         ":",
//                         {
//                           $toString: {
//                             $cond: [
//                               { $lt: ["$$minutes", 10] },
//                               { $concat: ["0", { $toString: "$$minutes" }] },
//                               "$$minutes"
//                             ]
//                           }
//                         },
//                         " ",
//                         { $cond: [{ $gte: ["$$hours", 12] }, "PM", "AM"] }
//                       ]
//                     }
//                   }
//                 }
//               }
//             },
//             else: "N/A"
//           }
//         },
//         shiftEndTime12h: {
//           $cond: {
//             if: "$shiftDetails.endTime",
//             then: {
//               $let: {
//                 vars: {
//                   timeParts: { $split: ["$shiftDetails.endTime", ":"] }
//                 },
//                 in: {
//                   $let: {
//                     vars: {
//                       hours: { $toInt: { $arrayElemAt: ["$$timeParts", 0] } },
//                       minutes: { $toInt: { $arrayElemAt: ["$$timeParts", 1] } }
//                     },
//                     in: {
//                       $concat: [
//                         {
//                           $toString: {
//                             $cond: [
//                               { $eq: ["$$hours", 0] },
//                               12,
//                               { $mod: ["$$hours", 12] }
//                             ]
//                           }
//                         },
//                         ":",
//                         {
//                           $toString: {
//                             $cond: [
//                               { $lt: ["$$minutes", 10] },
//                               { $concat: ["0", { $toString: "$$minutes" }] },
//                               "$$minutes"
//                             ]
//                           }
//                         },
//                         " ",
//                         { $cond: [{ $gte: ["$$hours", 12] }, "PM", "AM"] }
//                       ]
//                     }
//                   }
//                 }
//               }
//             },
//             else: "N/A"
//           }
//         },
//         numEmployees: 1
//       }
//     }
//   ]);

//   res.status(200).json({
//     status: "success",
//     results: counts.length,
//     data: {
//       counts
//     }
//   });
// });
// exports.getEmployeeCountsByDepartment = catchAsync(async (req, res, next) => {
//   const counts = await Employee.aggregate([
//     {
//       $group: {
//         _id: "$department", // Group by the department field
//         numEmployees: { $sum: 1 } // Count the number of employees in each department
//       }
//     },
//     {
//       $lookup: {
//         from: "departments", // The name of the Department collection in MongoDB
//         localField: "_id",
//         foreignField: "_id",
//         as: "departmentDetails"
//       }
//     },
//     {
//       $unwind: "$departmentDetails" // Unwind the department details array
//     },
//     {
//       $project: {
//         _id: 0, // Exclude the _id field from the result
//         departmentId: "$departmentDetails._id",
//         departmentName: "$departmentDetails.name",
//         departmentDepId: "$departmentDetails.depId",
//         numEmployees: 1
//       }
//     }
//   ]);

//   res.status(200).json({
//     status: "success",
//     results: counts.length,
//     data: {
//       counts
//     }
//   });
// });
// exports.getAllEmployees = catchAsync(async (req, res, next) => {
//   // let filter = {};
//   // console.log("req.params.id", req.query);
//   // ! EXECUTE QUERY
//   // let filter = {};
//   // if (req.params.id) filter = { employees: req.params.id };

//   const features = new APIFeatures(Employee.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .pagination();
//   const employees = await features.query.populate("reports");

//   // const employees = await Employee.find();
//   res.status(200).json({
//     status: "success",
//     results: employees.length,
//     data: {
//       employees
//     }
//   });
// });

// exports.getEmployee = catchAsync(async (req, res, next) => {
//   const employee = await Employee.findById(req.params.id).populate("reports");
//   if (!employee) return next(new AppError("Employee not found", 404));
//   if (!employee) return res.status(404).json({ message: "Employee not found" });
//   res.status(200).json({
//     status: "success",
//     data: {
//       employee
//     }
//   });
// });
// exports.createEmployee = catchAsync(async (req, res, next) => {
//   const { image } = req.files;
//   const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
//   if (!allowedFormats.includes(image.mimetype)) {
//     return next(new AppError("Invalid image format", 400));
//   }
//   const result = await cloudinary.uploader.upload(image.tempFilePath);
//   if (!result) {
//     return next(new AppError("Image upload failed", 500));
//   }
//   req.body.image = result.secure_url;
//   const employee = await Employee.create(req.body);
//   res.status(201).json({
//     status: "success",
//     data: {
//       employee
//     }
//   });
// });
// exports.updateEmployee = catchAsync(async (req, res, next) => {
//   // const { image } = req.files;
//   // const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
//   // if (!allowedFormats.includes(image.mimetype)) {
//   //   return next(new AppError("Invalid image format", 400));
//   // }
//   // const result = await cloudinary.uploader.upload(image.tempFilePath);
//   // if (!result) {
//   //   return next(new AppError("Image upload failed", 500));
//   // }
//   // req.body.image = result.secure_url;
//   if (req.files && req.files.image) {
//     // console.log("req.files");
//     const { image } = req.files;
//     const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
//     if (!allowedFormats.includes(image.mimetype)) {
//       return next(new AppError("Invalid image format", 400));
//     }

//     const result = await cloudinary.uploader.upload(image.tempFilePath);
//     if (!result) {
//       return next(new AppError("Image upload failed", 500));
//     }

//     req.body.image = result.secure_url;
//   }

//   const updateEmployee = await Employee.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {
//       new: true,
//       runValidators: true
//     }
//   );
//   if (!updateEmployee) return next(new AppError("Employee not found", 404));
//   res.status(200).json({
//     status: "success",
//     data: {
//       employee: updateEmployee
//     }
//   });
// });

// exports.deleteEmployee = catchAsync(async (req, res, next) => {
//   await Employee.findByIdAndDelete(req.params.id);
//   await Account.findOneAndDelete({ employee: req.params.id });
//   res.status(204).json({
//     status: "success",
//     data: null
//   });
// });
const cloudinary = require("cloudinary");
const { Readable } = require("stream");
const Employee = require("../Models/employeeModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeature");
const Account = require("../Models/accountModel");
const Report = require("../Models/reportModel");

exports.getEmployeeCountsByShift = catchAsync(async (req, res, next) => {
  const timeTo12Hour = field => ({
    $cond: {
      if: `$${field}`,
      then: {
        $let: {
          vars: {
            parts: { $split: [`$${field}`, ":"] },
            hours: {
              $toInt: { $arrayElemAt: [{ $split: [`$${field}`, ":"] }, 0] }
            },
            minutes: {
              $toInt: { $arrayElemAt: [{ $split: [`$${field}`, ":"] }, 1] }
            }
          },
          in: {
            $concat: [
              {
                $toString: {
                  $cond: [
                    { $eq: ["$$hours", 0] },
                    12,
                    { $mod: ["$$hours", 12] }
                  ]
                }
              },
              ":",
              {
                $cond: [
                  { $lt: ["$$minutes", 10] },
                  { $concat: ["0", { $toString: "$$minutes" }] },
                  { $toString: "$$minutes" }
                ]
              },
              " ",
              { $cond: [{ $gte: ["$$hours", 12] }, "PM", "AM"] }
            ]
          }
        }
      },
      else: "N/A"
    }
  });

  const counts = await Employee.aggregate([
    { $group: { _id: "$shift", numEmployees: { $sum: 1 } } },
    {
      $lookup: {
        from: "shifts",
        localField: "_id",
        foreignField: "_id",
        as: "shiftDetails"
      }
    },
    { $unwind: "$shiftDetails" },
    {
      $project: {
        _id: 0,
        shiftId: "$shiftDetails._id",
        shiftStartTime: "$shiftDetails.startTime",
        shiftEndTime: "$shiftDetails.endTime",
        shiftStartTime12h: timeTo12Hour("shiftDetails.startTime"),
        shiftEndTime12h: timeTo12Hour("shiftDetails.endTime"),
        numEmployees: 1
      }
    }
  ]);

  res.status(200).json({
    status: "success",
    results: counts.length,
    data: { counts }
  });
});

exports.getEmployeeCountsByDepartment = catchAsync(async (req, res, next) => {
  const counts = await Employee.aggregate([
    {
      $group: {
        _id: "$department",
        numEmployees: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "departments",
        localField: "_id",
        foreignField: "_id",
        as: "departmentDetails"
      }
    },
    {
      $unwind: "$departmentDetails"
    },
    {
      $project: {
        _id: 0,
        departmentId: "$departmentDetails._id",
        departmentName: "$departmentDetails.name",
        departmentDepId: "$departmentDetails.depId",
        numEmployees: 1
      }
    }
  ]);

  res.status(200).json({
    status: "success",
    results: counts.length,
    data: {
      counts
    }
  });
});

exports.getAllEmployees = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Employee.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const employees = await features.query.populate("reports");

  res.status(200).json({
    status: "success",
    results: employees.length,
    data: {
      employees
    }
  });
});

exports.getEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).populate("reports");
  if (!employee) return next(new AppError("Employee not found", 404));
  res.status(200).json({
    status: "success",
    data: {
      employee
    }
  });
});

exports.createEmployee = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError("No image provided", 400));

  const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedFormats.includes(req.file.mimetype))
    return next(new AppError("Invalid image format", 400));

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "image" },
      (err, res1) =>
        err
          ? reject(new AppError(`Image upload failed: ${err.message}`, 500))
          : resolve(res1)
    );
    Readable.from(req.file.buffer)
      .pipe(stream)
      .on("error", err =>
        reject(new AppError(`Buffer stream error: ${err.message}`, 500))
      );
  });

  req.body.image = result.secure_url; // ✅ assign first
  const employee = await Employee.create(req.body); // ✅ no overriding
  res.status(201).json({ status: "success", data: { employee } });
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
  if (req.file) {
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedFormats.includes(req.file.mimetype))
      return next(new AppError("Invalid image format", 400));

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "image" },
        (err, res1) =>
          err
            ? reject(new AppError(`Image upload failed: ${err.message}`, 500))
            : resolve(res1)
      );
      Readable.from(req.file.buffer)
        .pipe(stream)
        .on("error", err =>
          reject(new AppError(`Buffer stream error: ${err.message}`, 500))
        );
    });

    req.body.image = result.secure_url;
  }

  const employee = await Employee.findById(req.params.id);
  if (!employee) return next(new AppError("Employee not found", 404));

  // Prevent overwriting `image` with `undefined`
  const updatedData = { ...employee.toObject(), ...req.body };
  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {
      new: true,
      runValidators: true
    }
  );

  res
    .status(200)
    .json({ status: "success", data: { employee: updatedEmployee } });
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
  // console.log("deleteEmployee: Deleting employee", req.params.id);
  await Report.deleteMany({ employee: req.params.id });
  await Employee.findByIdAndDelete(req.params.id);
  await Account.findOneAndDelete({ employee: req.params.id });
  // console.log("deleteEmployee: Employee deleted successfully");
  res.status(204).json({
    status: "success",
    data: null
  });
});
