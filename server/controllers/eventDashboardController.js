const mongoose = require("mongoose");

const getAllEvents = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray(); // Get all collections
    
    // Improved filter for event collections
    // Look for collections that match the pattern: eventname-year format (like Hackathon-2424)
    const eventCollections = collections
      .map(col => col.name)
      .filter(name => /^[a-zA-Z]+-\d{4}$/.test(name)); // Match event name followed by hyphen and 4 digits
    
    const currentDate = new Date();
    const pastEvents = [];
    let ongoingEvent = null;
    
    // Event date mapping - you should ideally store this in a separate collection
    const eventDates = {
      "Hackathon-2424": {
        startDate: new Date("2025-03-22"), // Set to your actual Hackathon date
        endDate: new Date("2025-03-23")
      },
      // Add other events with their dates here
    };
    
    // Default dates if not specified in the mapping
    const defaultStartDate = new Date("2024-01-01");
    const defaultEndDate = new Date("2024-12-31");
    
    // Process each event collection
    for (const eventCollection of eventCollections) {
      const collection = db.collection(eventCollection);
      const participantCount = await collection.countDocuments(); // Count participants
      
      // Extract event name (everything before the hyphen)
      const eventName = eventCollection.split("-")[0];
      
      // Get event dates from mapping or use defaults
      const eventDatesInfo = eventDates[eventCollection] || {
        startDate: defaultStartDate,
        endDate: defaultEndDate
      };
      
      const eventData = {
        name: eventName,
        collectionName: eventCollection,
        participantCount: participantCount,
        startDate: eventDatesInfo.startDate,
        endDate: eventDatesInfo.endDate,
        // Format dates for display
        formattedStartDate: eventDatesInfo.startDate.toLocaleDateString(),
        formattedEndDate: eventDatesInfo.endDate.toLocaleDateString(),
      };
      
      // Logic to categorize events
      if (eventDatesInfo.endDate < currentDate) {
        pastEvents.push(eventData);
      } else if (
        (eventDatesInfo.startDate <= currentDate && eventDatesInfo.endDate >= currentDate) ||
        (eventCollection === "Hackathon-2424") // Force "Hackathon-2424" to be ongoing
      ) {
        ongoingEvent = eventData;
      }
    }
    
    res.json({ 
      pastEvents, 
      ongoingEvent 
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllEvents };