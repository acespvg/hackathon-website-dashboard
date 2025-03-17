const express = require('express');
const router = express.Router();
const { getAllParticipants, getFEParticipants, getSEParticipants, getTEParticipants, getBEParticipants } = require('../controllers/genesisController');

// Route to get all participants
router.get('/', getAllParticipants);

// Route to get FE Participants
router.get('/FE', getFEParticipants);

// Route to get SE Participants
router.get('/SE', getSEParticipants);

// Route to get TE Participants
router.get('/TE', getTEParticipants);

// Route to get BE Participants
router.get('/BE', getBEParticipants);

module.exports = router;