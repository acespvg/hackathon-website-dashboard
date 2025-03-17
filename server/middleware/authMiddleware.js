const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authMiddleware = async (req, res, next) => {
  // Extract token from the Authorization header (format: Bearer <token>)
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user by decoded userId
    const user = await User.findById(decoded.userId);
    
    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach the user to the request object to be used in subsequent routes
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle errors (e.g., invalid or expired token)
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
