const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  migrateExistingEvents
} = require("../controllers/eventController");

// Create new event
router.post("/", createEvent);

// Get all events
router.get("/", getAllEvents);

// Get single event
router.get("/:id", getEventById);

// Update event
router.put("/:id", updateEvent);

// Delete event
router.delete("/:id", deleteEvent);

// Migrate existing collections to events
router.post("/migrate", migrateExistingEvents);

module.exports = router;