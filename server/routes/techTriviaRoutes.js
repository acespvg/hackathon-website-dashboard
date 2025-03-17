const express = require('express');
const router = express.Router();
const { getAllParticipants, getFEParticipants ,getSEParticipants, getTEParticipants, 
        getBEParticipants, getCEParticipants, getETCParticipants, getMEParticipants, 
        getITParticipants } = require('../controllers/techTriviaController');

// Route to get all members
router.get('/', getAllParticipants);

// Route to get FE Participants
router.get('/FE', getFEParticipants);

// Route to get SE Participants
router.get('/SE', getSEParticipants);

// Route to get TE Participants
router.get('/TE', getTEParticipants);

// Route to get BE Participants
router.get('/BE', getBEParticipants);

// Route to get CE Participants
router.get('/CE', getCEParticipants);

// Route to get ETC Participants
router.get('/ETC', getETCParticipants);

// Route to get ME Participants
router.get('/ME', getMEParticipants);

// Route to get IT Participants
router.get('/IT', getITParticipants);

module.exports = router;