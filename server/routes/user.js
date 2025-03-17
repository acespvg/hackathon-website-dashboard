// // routes/users.js
// const express = require('express');
// const router = express.Router();
// const { register, login } = require('../controllers/userController');
// const authMiddleware = require('../middleware/auth'); // Import the auth middleware

// // Route for user registration (no authentication required)
// router.post('/register', register);

// // Route for user login (no authentication required)
// router.post('/login', login);

// // Route to get the authenticated user's profile
// router.get('/me', authMiddleware, async (req, res) => {
//     try {
//       // Use req.user to access the authenticated user's data
//       const user = req.user;
//       res.status(200).json({ user });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to get user data' });
//     }
//   });

// module.exports = router;
