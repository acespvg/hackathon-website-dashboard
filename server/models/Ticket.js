// models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, default: 'Active' },
  customerName: { type: String, required: true },
  notes: [
    {
      note: { type: String, required: true },
      author: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
