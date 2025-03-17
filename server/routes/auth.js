// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// // Registration Route
// router.post('/register', async (req, res) => {
//   const { username, email, password, role } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({ username, email, password: hashedPassword, role });
//   try {
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Login Route (for generating JWT token)
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key');
//   res.json({ token });
// });

// module.exports = router;
