const Note = require('../models/Note');
const Ticket = require('../models/Ticket');  // Assuming you have a Ticket model
const User = require('../models/User');      // Assuming you have a User model

// Create a new note
exports.createNote = async (req, res) => {
  const { ticketId, content } = req.body; // Expecting ticketId and content from the request body
  const addedBy = req.user.id; // Assuming `req.user.id` is the authenticated user's ID

  if (!ticketId || !content) {
    return res.status(400).json({ message: 'Ticket ID and content are required' });
  }

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const newNote = new Note({
      ticket: ticketId,
      content,
      addedBy,
    });

    await newNote.save();
    res.status(201).json({ message: 'Note added successfully', note: newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create note' });
  }
};

// Get all notes for a specific ticket
exports.getNotesForTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const notes = await Note.find({ ticket: ticketId })
      .populate('addedBy', 'name email')  // Populate the 'addedBy' field with the user details
      .sort({ timestamp: -1 });  // Optionally, sort notes by timestamp (latest first)
      
    if (notes.length === 0) {
      return res.status(404).json({ message: 'No notes found for this ticket' });
    }

    res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

// Get a specific note by ID
exports.getNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id)
      .populate('ticket', 'ticketId') // Optionally, populate ticket details
      .populate('addedBy', 'name email');
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch note' });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { content, timestamp: Date.now() }, // Updating content and timestamp
      { new: true }
    );
    
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note updated', note: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update note' });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete note' });
  }
};
