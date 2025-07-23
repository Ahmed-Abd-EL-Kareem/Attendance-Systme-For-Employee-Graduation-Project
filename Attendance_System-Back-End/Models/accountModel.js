const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const Employee = require("./employeeModel");

const accountSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User Name Is Required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please Enter A Password"],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please Confirm Your Password"],
    validate: {
      // ! This Only Works On Create And Save!!!s
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords Must Match"
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: "Employee"
  }
});

accountSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
accountSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
accountSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});
accountSchema.pre(/^find/, function(next) {
  this.populate({
    path: "employee",
    select: ["-__v", "-account"] // Exclude unnecessary fields
  });
  next();
});

// Middleware to unset the account field in Employee when Account is deleted
// accountSchema.pre("remove", async function(next) {
//   await Employee.findByIdAndUpdate(this.employee, { $unset: { account: "" } });
//   next();
// });
accountSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
accountSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
