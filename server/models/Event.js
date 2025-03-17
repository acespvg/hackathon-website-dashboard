const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming"
  },
  participationCollection: {
    type: String,
    required: true
  },
  participantCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to automatically update the status based on current date
EventSchema.methods.updateStatus = function() {
  const now = new Date();
  
  if (now < this.startDate) {
    this.status = "upcoming";
  } else if (now >= this.startDate && now <= this.endDate) {
    this.status = "ongoing";
  } else {
    this.status = "completed";
  }
  
  return this.status;
};

// Pre-save middleware to ensure status is set correctly before saving
EventSchema.pre("save", function(next) {
  this.updateStatus();
  next();
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;