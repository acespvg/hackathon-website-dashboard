const TechTrivia = require('../models/TechTrivia');

// Get all members
exports.getAllParticipants = async (req, res) => {
  try {
    const members = await TechTrivia.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
};

// Get a Participant by Year

exports.getFEParticipants = async (req, res) => {
  try {
    const members = await TechTrivia.find({ Year: "FE" });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
}

exports.getSEParticipants = async (req, res) => {
  try {
    const members = await TechTrivia.find({ Year: "SE" });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
}

exports.getTEParticipants = async (req, res) => {
  try {
    const members = await TechTrivia.find({ Year: "TE" });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
}

exports.getBEParticipants = async (req, res) => {
  try {
    const members = await TechTrivia.find({ Year: "BE" });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
}

// Get a participant by Branch

exports.getCEParticipants = async (req, res) => {
  try {
    const members = await TechTrivia.find({ Branch: "Computer Engineering" });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
}

exports.getETCParticipants = async (req, res) => {
  try {
    const members = await TechTrivia.find({ Branch: "Electronics and Telecommunication" });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
}

exports.getMEParticipants = async (req, res) => {
  try {
    const members = await TechTrivia.find({ Branch: "Mechanical engineering" });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
}

exports.getITParticipants = async (req, res) => {
  try {
    const members = await TechTrivia.find({ Branch: "Information Technology" });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
}