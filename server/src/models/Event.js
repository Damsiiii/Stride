const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Event title is required"],
    trim: true,
    maxlength: [150, "Title cannot exceed 150 characters"],
  },
  date: {
    type: Date,
    required: [true, "Event date is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
    maxlength: [200, "Location cannot exceed 200 characters"],
  },
  distance: {
    type: String,
    trim: true,
    default: "5K / 10K",
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },
  paceGroup: {
    type: String,
    trim: true,
    default: "All Paces",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
