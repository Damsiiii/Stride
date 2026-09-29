const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// GET /api/members — List all members (with pagination)
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const total = await Member.countDocuments();
    const members = await Member.find()
      .sort({ joinedAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: members,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (err) {
    console.error("Error fetching members:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
});

// GET /api/members/:id — Fetch a single member by ID
router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        error: "Member not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: member,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid member ID format.",
      });
    }

    console.error("Error fetching member:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
});

// POST /api/members — Register a new member
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, pace, experienceLevel } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Name and email are required.",
      });
    }

    const member = new Member({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      pace: pace || "Casual (6:00 - 7:00 /km)",
      experienceLevel: experienceLevel || "Beginner",
    });

    const saved = await member.save();

    return res.status(201).json({
      success: true,
      data: {
        id: saved._id,
        name: saved.name,
        email: saved.email,
        joinedAt: saved.joinedAt,
      },
    });
  } catch (err) {
    // Duplicate email (MongoDB unique index violation)
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "A member with this email already exists.",
      });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        error: messages.join(", "),
      });
    }

    console.error("Error registering member:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
});

// DELETE /api/members/:id — Delete a member by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) {
      return res.status(404).json({
        success: false,
        error: "Member not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Member deleted successfully.",
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid member ID format.",
      });
    }

    console.error("Error deleting member:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
});

module.exports = router;

