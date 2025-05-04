// server/routes/profile.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/', async (req, res) => {
    try {
        const userId = req.user.userId; // Match the token payload field (userId)
        const user = await User.findById(userId).select('-password -__v');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update user preferences
router.put('/', async (req, res) => {
    try {
        const userId = req.user.userId;
        const { preferences } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { preferences },
            { new: true, runValidators: true }
        ).select('-password -__v');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;