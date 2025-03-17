const mongoose = require("mongoose");
const Event = require("../models/Event");

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    
    // Validate dates
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: "End date must be after start date" });
    }
    
    // Create participation collection name (eventname-year)
    const eventYear = new Date(startDate).getFullYear();
    const participationCollection = `${name.replace(/\s+/g, "")}-${eventYear}`;
    
    // Check if collection already exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === participationCollection);
    
    if (!collectionExists) {
      // Create the new collection
      await mongoose.connection.db.createCollection(participationCollection);
    }
    
    // Create new event
    const newEvent = new Event({
      name,
      description,
      startDate,
      endDate,
      participationCollection,
      participantCount: 0
    });
    
    await newEvent.save();
    
    res.status(201).json({
      message: "Event created successfully",
      event: newEvent
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all events with updated status and participation count
const getAllEvents = async (req, res) => {
  try {
    // Get all events
    const events = await Event.find().sort({ startDate: 1 });
    
    // Update participation counts and statuses
    const updatedEvents = await Promise.all(events.map(async (event) => {
      const eventObj = event.toObject();
      
      // Update the event status based on current date
      event.updateStatus();
      if (event.isModified()) {
        await event.save();
      }
      
      // Update participant count
      try {
        const collection = mongoose.connection.db.collection(event.participationCollection);
        const count = await collection.countDocuments();
        
        if (count !== event.participantCount) {
          event.participantCount = count;
          await event.save();
        }
        
        eventObj.participantCount = count;
        eventObj.status = event.status;
      } catch (err) {
        console.error(`Error counting participants for ${event.name}:`, err);
      }
      
      return eventObj;
    }));
    
    // Separate events by status
    const pastEvents = updatedEvents.filter(event => event.status === "completed");
    const ongoingEvent = updatedEvents.find(event => event.status === "ongoing");
    const upcomingEvents = updatedEvents.filter(event => event.status === "upcoming");
    
    res.json({
      pastEvents,
      ongoingEvent: ongoingEvent || null,
      upcomingEvents
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    // Update event status
    event.updateStatus();
    if (event.isModified()) {
      await event.save();
    }
    
    // Get participant count
    try {
      const collection = mongoose.connection.db.collection(event.participationCollection);
      const count = await collection.countDocuments();
      
      if (count !== event.participantCount) {
        event.participantCount = count;
        await event.save();
      }
    } catch (err) {
      console.error(`Error counting participants for ${event.name}:`, err);
    }
    
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    
    // Validate dates if provided
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: "End date must be after start date" });
    }
    
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    // Update fields
    if (name) event.name = name;
    if (description) event.description = description;
    if (startDate) event.startDate = startDate;
    if (endDate) event.endDate = endDate;
    
    // Update status before saving
    event.updateStatus();
    await event.save();
    
    res.json({
      message: "Event updated successfully",
      event
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    // Option to delete the participation collection as well
    const { deleteCollection } = req.query;
    
    if (deleteCollection === "true") {
      try {
        await mongoose.connection.db.dropCollection(event.participationCollection);
      } catch (err) {
        console.error(`Failed to drop collection ${event.participationCollection}:`, err);
      }
    }
    
    await Event.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Migrate existing collections to the new event model
const migrateExistingEvents = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    // Filter for event collections (assuming format: eventname-year)
    const eventCollections = collections
      .map(col => col.name)
      .filter(name => /^[a-zA-Z]+-\d{4}$/.test(name));
    
    const migratedEvents = [];
    const errors = [];
    
    for (const collectionName of eventCollections) {
      try {
        // Check if event already exists for this collection
        const existingEvent = await Event.findOne({ participationCollection: collectionName });
        
        if (existingEvent) {
          continue; // Skip if already migrated
        }
        
        // Parse event name and year
        const [eventName, yearStr] = collectionName.split("-");
        const year = parseInt(yearStr);
        
        // Create dates (as an example - adjust as needed)
        const startDate = new Date(year, 0, 1); // January 1st of the year
        const endDate = new Date(year, 11, 31); // December 31st of the year
        
        // Count participants
        const collection = db.collection(collectionName);
        const participantCount = await collection.countDocuments();
        
        // Create new event
        const newEvent = new Event({
          name: eventName,
          description: `Migrated event: ${eventName}`,
          startDate,
          endDate,
          participationCollection: collectionName,
          participantCount
        });
        
        await newEvent.save();
        migratedEvents.push(newEvent);
      } catch (err) {
        console.error(`Error migrating collection ${collectionName}:`, err);
        errors.push({ collection: collectionName, error: err.message });
      }
    }
    
    res.json({
      message: `Successfully migrated ${migratedEvents.length} events`,
      migrated: migratedEvents,
      errors
    });
  } catch (error) {
    console.error("Error in migration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  migrateExistingEvents
};