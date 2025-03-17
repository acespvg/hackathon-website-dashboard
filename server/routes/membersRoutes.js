const express = require('express');
const router = express.Router();
const { getAllMembers, getSEMembers, getTEMembers, getBEMembers } = require('../controllers/membersController');

// Route to get all members
router.get('/', getAllMembers);

// Route to get SE Members
router.get('/SE', getSEMembers);

// Route to get TE Members
router.get('/TE', getTEMembers);

// Route to get BE Members  
router.get('/BE', getBEMembers);

module.exports = router;