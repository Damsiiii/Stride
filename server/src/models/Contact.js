const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  contact: {
    type: String,
    required: [true, "Contact (email or WhatsApp number) is required"],
    trim: true,
    maxlength: [150, "Contact info cannot exceed 150 characters"],
  },
  pace: {
    type: String,
    trim: true,
    default: "Casual (6:00 - 7:00 /km)",
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, "Message cannot exceed 1000 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
