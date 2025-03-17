// controllers/ticketController.js
const Ticket = require('../models/Ticket'); // Assuming you have a Ticket model

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tickets', error: err });
  }
};

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const newTicket = new Ticket({
      title: req.body.title,
      status: 'Active',
      customerName: req.body.customerName,
      notes: []
    });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ message: 'Error creating ticket', error: err });
  }
};

// Update ticket status
exports.updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.status = status;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Error updating ticket', error: err });
  }
};

// Add a note to a ticket
exports.addNoteToTicket = async (req, res) => {
  const { id } = req.params;
  const { note, author } = req.body;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const newNote = {
      note,
      author,
      timestamp: new Date()
    };

    ticket.notes.push(newNote);
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Error adding note', error: err });
  }
};
