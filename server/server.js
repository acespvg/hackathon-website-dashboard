// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const ticketRoutes = require('./routes/tickets'); // Import the ticket routes
// const userRoutes = require('./routes/user');
// const noteRoutes = require('./routes/note');
const membersRoutes = require('./routes/membersRoutes');
const techTriviaRoutes = require('./routes/techTriviaRoutes');
const genesisRoutes = require('./routes/genesisRoutes');
const hackathonRoutes = require('./routes/hackathonRoutes');
const loginRoutes = require('./routes/loginRoutes');
const eventDashboardRoutes = require('./routes/eventDashboardRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Use routes
// app.use('/api/tickets', ticketRoutes); // Mount the tickets route
// app.use('/api/users', userRoutes);
// app.use('/api/note', noteRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/techTrivia', techTriviaRoutes);
app.use('/api/genesis', genesisRoutes);
app.use('/api/hackathon', hackathonRoutes);
app.use('/api', loginRoutes);
app.use('/api/eventDashboard', eventDashboardRoutes);
app.use('/api/event', eventRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
