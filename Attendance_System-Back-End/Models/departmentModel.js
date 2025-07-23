const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  depId: {
    type: String,
    required: [true, "A department must have a id"],
    unique: true
  },
  name: { type: String, required: [true, "A department must have a name"] }
});

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
