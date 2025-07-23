const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    startTime: {
      type: String,
      required: [true, "A shift must have a start time"],
      validate: {
        validator: function(v) {
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(v);
        },
        message: props => `${props.value} is not a valid time format (HH:MM:SS)`
      }
    },
    endTime: {
      type: String,
      required: [true, "A shift must have an end time"],
      validate: {
        validator: function(v) {
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(v);
        },
        message: props => `${props.value} is not a valid time format (HH:MM:SS)`
      }
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual properties with seconds support
shiftSchema.virtual("startTime12h").get(function() {
  if (!this.startTime) return "N/A";
  const timeParts = this.startTime.split(":");
  if (timeParts.length !== 3) return "Invalid Time";

  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  // const seconds = parseInt(timeParts[2], 10);
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const hours12h = hours % 12 || 12;

  return `${hours12h}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
});

shiftSchema.virtual("endTime12h").get(function() {
  if (!this.endTime) return "N/A";
  const timeParts = this.endTime.split(":");
  if (timeParts.length !== 3) return "Invalid Time";

  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  // const seconds = parseInt(timeParts[2], 10);
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const hours12h = hours % 12 || 12;

  return `${hours12h}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
});

shiftSchema.virtual("shiftPeriod").get(function() {
  if (!this.startTime) return "Unknown";
  const timeParts = this.startTime.split(":");
  if (timeParts.length !== 3) return "Invalid";

  const hours = parseInt(timeParts[0], 10);
  if (hours >= 5 && hours < 12) return "Morning";
  if (hours >= 12 && hours < 17) return "Afternoon";
  if (hours >= 17 && hours < 21) return "Evening";
  return "Night";
});

const Shift = mongoose.model("Shift", shiftSchema);
module.exports = Shift;
