const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Add fs module
const User = require('../models/User');

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use the defined uploadDir
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g., 1634567890-123456789.jpg
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only images (jpeg, jpg, png) are allowed'));
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Get user profile
router.get('/', async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('-password -__v');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update user profile (preferences and photo)
router.put('/', upload.single('photo'), async (req, res) => {
    try {
        const userId = req.user.userId;
        const { firstName, lastName, email, preferences } = req.body;

        // Validate preferences
        let updatedPreferences = {};
        if (preferences) {
            const parsedPreferences = typeof preferences === 'string' ? JSON.parse(preferences) : preferences;
            if (!parsedPreferences || typeof parsedPreferences !== 'object') {
                return res.status(400).json({ error: 'Preferences must be a valid object with dietaryRestrictions, goals, and cuisinePreferences' });
            }
            updatedPreferences = {
                dietaryRestrictions: Array.isArray(parsedPreferences.dietaryRestrictions) ? parsedPreferences.dietaryRestrictions : [],
                goals: Array.isArray(parsedPreferences.goals) ? parsedPreferences.goals : [],
                cuisinePreferences: Array.isArray(parsedPreferences.cuisinePreferences) ? parsedPreferences.cuisinePreferences : [],
            };
        }

        // Prepare update object
        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (email) updateData.email = email;
        if (Object.keys(updatedPreferences).length > 0) updateData.preferences = updatedPreferences;
        if (req.file) updateData.photo = `/uploads/${req.file.filename}`; // Store the relative path to the photo

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password -__v');

        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(400).json({ error: error.message || 'Failed to update profile' });
    }
});

module.exports = router;