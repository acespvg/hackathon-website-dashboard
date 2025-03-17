const Genesis = require('../models/Genesis');

// Get all the participants
exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Genesis.find();
    res.status(200).json(participants);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get participants by year
exports.getFEParticipants = async (req, res) => {
  try {
    const participants = await Genesis.find({ Year: 'FE' });
    res.status(200).json(participants);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.getSEParticipants = async (req, res) => {
  try {
    const participants = await Genesis.find({ Year: 'SE' });
    res.status(200).json(participants);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.getTEParticipants = async (req, res) => {
  try {
    const participants = await Genesis.find({ Year: 'TE' });
    res.status(200).json(participants);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.getBEParticipants = async (req, res) => {
  try {
    const participants = await Genesis.find({ Year: 'BE' });
    res.status(200).json(participants);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

