const express = require('express');
const router = express.Router();
const { Register, Login, authenticate } = require('../controllers/loginController');

// Route to register a new user
router.post('/register', Register);

// Route to login
router.post('/login', Login);

// Protected route (Example: Dashboard Access)
router.get("/dashboard", authenticate, (req, res) => {
    res.json({ message: "Welcome to ACES Dashboard", user: req.user });
});

module.exports = router;
