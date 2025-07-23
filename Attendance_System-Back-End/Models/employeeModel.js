const mongoose = require("mongoose");
const slugify = require("slugify");
// const Account = require("./accountModel");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An employee must have a name"],
      trim: true,
      maxlength: [40, "A Employee Name Must Have Less Or Equal 40 Character"],
      minlength: [3, "A Employee Name Must Have Less Or Equal 10 Character"]
    },
    image: { type: String, required: [true, "An employee must have an image"] },
    // images: {
    //   type: [String]
    //   // required: [true, "An employee must have an image"]
    // },
    emId: { type: String, unique: true },
    slug: String,
    account: {
      type: mongoose.Schema.ObjectId,
      ref: "Account"
    },
    department: {
      type: mongoose.Schema.ObjectId,
      ref: "Department",
      required: [true, "An employee must belong to a department"]
    },
    shift: {
      type: mongoose.Schema.ObjectId,
      ref: "Shift",
      required: [true, "An employee must belong to a shift"]
    },
    // report: {
    //   type: [mongoose.Schema.ObjectId],
    //   ref: "Report"
    // },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male"
    },
    dof: {
      type: Date,
      required: [true, "An employee must have a date of birth"]
    },
    date: { type: Date, required: [true, "An employee must have a date"] }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
employeeSchema.virtual("reports", {
  ref: "Report",
  foreignField: "employee",
  localField: "_id"
});
employeeSchema.virtual("formattedDate").get(function() {
  if (!this.date) return "N/A";
  return this.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
});
employeeSchema.virtual("formattedDof").get(function() {
  if (!this.dof) return "N/A";
  return this.dof.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
});
employeeSchema.pre("save", async function(next) {
  this.slug = slugify(this.name, { lower: true });
  if (this.isNew && !this.emId) {
    const lastEmployee = await this.constructor.findOne().sort({ emId: -1 });
    const lastEmId = parseInt(lastEmployee.emId, 10); // Start from 164 if no employees exist
    this.emId = (lastEmId + 1).toString();
  }
  next();
});
employeeSchema.pre(/^find/, function(next) {
  this.populate({
    path: "department"
  });
  this.populate({
    path: "shift"
  });
  this.populate({
    path: "account",
    select: ["-employee", "-__v"] // Exclude unnecessary fields
  });
  // this.populate({
  //   path: "report",
  //   select: ["-employee", "-__v"] // Exclude unnecessary fields
  // });
  next();
});

// Middleware to delete associated Account when Employee is deleted
// employeeSchema.pre(/^findByIdAndDelete/, async function(next) {
//   console.log("Deleting employee with ID:", this._id);
//   if (this.account) {
//     console.log("Deleting Account with ID:");
//     await Account.findByIdAndDelete(this.account);
//   }
//   next();
// });
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
