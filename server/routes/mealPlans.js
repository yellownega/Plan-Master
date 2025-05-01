// server/routes/mealPlans.js
const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');
console.log('MealPlan model:', MealPlan); // Add this to debug

// Get meal plan by userId
router.get('/:userId', async (req, res) => {
    try {
        const mealPlan = await MealPlan.findOne({
            userId: req.params.userId,
        });
        res.json(mealPlan || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create or update meal plan
router.post('/', async (req, res) => {
    try {
        const mealPlan = await MealPlan.findOneAndUpdate(
            { userId: req.body.userId },
            req.body,
            { upsert: true, new: true }
        );
        res.json(mealPlan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;