const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// GET /api/events — List events (with pagination)
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const total = await Event.countDocuments();
    const events = await Event.find()
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: events,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (err) {
    console.error("Error fetching events:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
});

// GET /api/events/:id — Fetch a single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        error: "Event not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid event ID format.",
      });
    }

    console.error("Error fetching event:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
});

// POST /api/events — Create a new event
router.post("/", async (req, res) => {
  try {
    const { title, date, location, distance, description, paceGroup } = req.body;

    if (!title || !date || !location) {
      return res.status(400).json({
        success: false,
        error: "Title, date, and location are required.",
      });
    }

    const event = new Event({
      title: title.trim(),
      date: new Date(date),
      location: location.trim(),
      distance: distance ? distance.trim() : "5K / 10K",
      description: description ? description.trim() : "",
      paceGroup: paceGroup ? paceGroup.trim() : "All Paces",
    });

    const savedEvent = await event.save();

    return res.status(201).json({
      success: true,
      data: savedEvent,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        error: messages.join(", "),
      });
    }

    console.error("Error creating event:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
});

// DELETE /api/events/:id — Delete an event by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        error: "Event not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid event ID format.",
      });
    }

    console.error("Error deleting event:", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
});

module.exports = router;
