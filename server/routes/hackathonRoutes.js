const express = require('express');
const router = express.Router();
const { getAllTeams, getTwoTeamMembers, getThreeTeamMembers, getFourTeamMembers, countMaleParticipants, countFemaleParticipants, countOtherParticipants, countTotalTeams } = require('../controllers/hackathonController');

// Route to get all teams
router.get('/', getAllTeams);

// Route to get teams with 2 members
router.get('/two-members', getTwoTeamMembers);

// Route to get teams with 3 members
router.get('/three-members', getThreeTeamMembers);

// Route to get teams with 4 members
router.get('/four-members', getFourTeamMembers);

// Route to get the count of Male participants
router.get('/male-count', countMaleParticipants);

// Route to get the count of Female participants
router.get('/female-count', countFemaleParticipants);

// Route to get the count of Other participants
router.get('/other-count', countOtherParticipants);

// Route to count the total number of teams
router.get('/total-teams', countTotalTeams);

module.exports = router;