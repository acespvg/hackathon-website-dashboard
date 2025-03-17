const Member = require('../models/Members');

// Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
};

// Get a Member by Class
exports.getSEMembers = async (req, res) => {
  try {
    const members = await Member.find({MemberClass: "SE"});
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
}

exports.getTEMembers = async (req, res) => {
  try {
    const members = await Member.find({MemberClass: "TE"});
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
}

exports.getBEMembers = async (req, res) => {
  try {
    const members = await Member.find({MemberClass: "BE"});
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members', error: err });
  }
}