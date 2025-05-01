// server/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const mealPlanRoutes = require('./routes/mealPlans');
app.use('/api/mealplans', mealPlanRoutes);

// Basic Route
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Meal Mate API!' });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));