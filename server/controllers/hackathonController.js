const HackathonTeam = require('../models/Hackathon');

// Get all the participants
exports.getAllTeams = async (req, res) => {
  try {
    const participants = await HackathonTeam.find();
    res.status(200).json(participants);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get the teams on the basis of number of team members
exports.getTwoTeamMembers = async (req, res) => {
  try {
    const participants = await HackathonTeam.find({ teamSize: 2 });
    res.status(200).json(participants);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.getThreeTeamMembers = async (req, res) => {
  try {
    const participants = await HackathonTeam.find({ teamSize: 3 });
    res.status(200).json(participants);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.getFourTeamMembers = async (req, res) => {
  try {
    const participants = await HackathonTeam.find({ teamSize: 4 });
    res.status(200).json(participants);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Function to count male participants
exports.countMaleParticipants = async (req, res) => {
  try {
    const maleCount = await HackathonTeam.aggregate([
      {
        $project: {
          leaderGender: "$leader.gender",
          teamMembersGenders: "$teamMembers.gender"
        }
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: {
              $add: [
                { $cond: [{ $eq: ["$leaderGender", "male"] }, 1, 0] },
                {
                  $size: {
                    $filter: {
                      input: "$teamMembersGenders",
                      as: "gender",
                      cond: { $eq: ["$$gender", "male"] }
                    }
                  }
                }
              ]
            }
          }
        }
      }
    ]);

    res.status(200).json({ success: true, maleCount: maleCount[0]?.count || 0 });
  } catch (error) {
    console.error("Error counting male participants:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to count female participants
exports.countFemaleParticipants = async (req, res) => {
  try {
    const femaleCount = await HackathonTeam.aggregate([
      {
        $project: {
          leaderGender: "$leader.gender",
          teamMembersGenders: "$teamMembers.gender"
        }
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: {
              $add: [
                { $cond: [{ $eq: ["$leaderGender", "female"] }, 1, 0] },
                {
                  $size: {
                    $filter: {
                      input: "$teamMembersGenders",
                      as: "gender",
                      cond: { $eq: ["$$gender", "female"] }
                    }
                  }
                }
              ]
            }
          }
        }
      }
    ]);

    res.status(200).json({ success: true, femaleCount: femaleCount[0]?.count || 0 });
  } catch (error) {
    console.error("Error counting female participants:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to count "other" participants
exports.countOtherParticipants = async (req, res) => {
  try {
    const otherCount = await HackathonTeam.aggregate([
      {
        $project: {
          leaderGender: "$leader.gender",
          teamMembersGenders: "$teamMembers.gender"
        }
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: {
              $add: [
                { $cond: [{ $eq: ["$leaderGender", "other"] }, 1, 0] },
                {
                  $size: {
                    $filter: {
                      input: "$teamMembersGenders",
                      as: "gender",
                      cond: { $eq: ["$$gender", "other"] }
                    }
                  }
                }
              ]
            }
          }
        }
      }
    ]);

    res.status(200).json({ success: true, otherCount: otherCount[0]?.count || 0 });
  } catch (error) {
    console.error("Error counting other participants:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Function to count total teams
exports.countTotalTeams = async (req, res) => {
  try {
    const totalTeams = await HackathonTeam.countDocuments();

    res.status(200).json({ success: true, totalTeams });
  } catch (error) {
    console.error("Error counting total teams:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};