const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads')); // Add this line to serve uploaded images

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers[ 'authorization' ];
    const token = authHeader && authHeader.split(' ')[ 1 ];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = decoded; // decoded contains {userId, iat, exp}
        next();
    });
};

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));

// Routes
const authRoutes = require('./routes/auth'); // Add this line to load auth routes
const profileRoutes = require('./routes/profile');
const mealPlanRoutes = require('./routes/mealplans');
app.use('/api/auth', authRoutes); // Mount auth routes at /api/auth
app.use('/api/profile', authenticateToken, profileRoutes); // Keep profile routes
app.use('/api/mealplans', authenticateToken, mealPlanRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));