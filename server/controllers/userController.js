const User = require('../models/User'); // Assuming the User model is in models/User.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator'); // For input validation (optional)

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // JWT secret key for token signing

// Register a new user
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { username, email, password, role } = req.body;  // Include 'username'
  
    try {
      // Check if the user already exists by email or username
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        username,  // Pass 'username'
        email,
        password: hashedPassword,
        role
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Generate JWT token for the user
      const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, {
        expiresIn: '1h',
      });
  
      // Send response with the token
      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: newUser._id, username: newUser.username, email: newUser.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to register user' });
    }
  };
  

// Login a user
// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Compare the entered password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token for the user
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });
  
      // Send response with the token
      res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to log in' });
    }
  };
  
