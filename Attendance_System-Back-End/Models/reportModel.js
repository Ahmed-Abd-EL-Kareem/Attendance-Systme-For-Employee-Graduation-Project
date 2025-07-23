const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    date: { type: String, required: [true, "A report must have a date"] },
    timeIn: { type: String },
    timeOut: { type: String },
    statusIn: { type: String, default: "Not Checked" },
    statusOut: { type: String, default: "Not Checked" },
    notes: { type: String },
    employee: {
      type: mongoose.Schema.ObjectId,
      ref: "Employee",
      required: [true, "A report must belong to a employee"]
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
// ! Indexing for faster queries( NEED TESTING)
reportSchema.index({ employee: 1, date: 1 }, { unique: true });
reportSchema.virtual("timeIn12h").get(function() {
  if (!this.timeIn) return "N/A";
  const timeParts = this.timeIn.split(":");
  if (timeParts.length !== 3) return this.timeIn;

  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  // const seconds = parseInt(timeParts[2], 10);
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const hours12h = hours % 12 || 12;

  return `${hours12h}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
});

reportSchema.virtual("timeOut12h").get(function() {
  if (!this.timeOut) return "N/A";
  const timeParts = this.timeOut.split(":");
  if (timeParts.length !== 3) return this.timeOut;

  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  // const seconds = parseInt(timeParts[2], 10);
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const hours12h = hours % 12 || 12;

  return `${hours12h}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
});
// reportSchema.pre(/^find/, function(next) {
//   // this.populate({
//   //   path: "employee",
//   //   select: ["-__v", "-account", "-report"] // Exclude unnecessary fields
//   // });
//   next();
// });
const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
