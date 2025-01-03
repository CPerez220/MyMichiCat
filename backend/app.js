const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const connectDB = require('./db');
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors({
  origin: ['https://frontend-rwqry1tu1-mymichicats-projects.vercel.app', 'http://localhost:3000'], // Replace with your Vercel domain
  credentials: true, // Allow credentials like tokens to be sent
}));
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the MyMichiCat Backend!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});