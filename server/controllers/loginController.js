const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key

// User Registration
exports.Register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// User Login
exports.Login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ userID: user.userID }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token, message: "Login successful" });
};

// Middleware to check authentication
exports.authenticate = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Access denied" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};
