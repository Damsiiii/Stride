const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contacts — Save a new contact form submission
router.post("/", async (req, res) => {
  try {
    const { name, contact, pace, message } = req.body;

    // Basic validation
    if (!name || !contact) {
      return res.status(400).json({
        success: false,
        error: "Name and contact information are required.",
      });
    }

    const newContact = new Contact({
      name: name.trim(),
      contact: contact.trim(),
      pace: pace || "Casual (6:00 - 7:00 /km)",
      message: message ? message.trim() : "",
    });

    const savedContact = await newContact.save();

    return res.status(201).json({
      success: true,
      data: {
        id: savedContact._id,
        name: savedContact.name,
        createdAt: savedContact.createdAt,
      },
    });
  } catch (err) {
    // Mongoose validation error
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        error: messages.join(", "),
      });
    }

    console.error("Error saving contact:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
});

module.exports = router;
