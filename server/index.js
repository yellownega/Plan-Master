// server/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers[ 'authorization' ]?.split(' ')[ 1 ];
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = decoded; // Attach decoded user info (e.g., userId)
        next();
    });
};

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Routes
const mealPlanRoutes = require('./routes/mealPlans');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

app.use('/api/mealplans', mealPlanRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', authenticateToken, profileRoutes); // Ensure this line is present

// Basic Route
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Meal Mate API!' });
});

// Error handling for unhandled routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Server startup error:', err);
    process.exit(1);
});