// server/routes/mealplans.js
const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');

// Get meal plan for a user
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const mealPlan = await MealPlan.findOne({ userId });
        if (!mealPlan) {
            return res.status(404).json({ error: 'Meal plan not found' });
        }
        res.json(mealPlan);
    } catch (error) {
        console.error('Error fetching meal plan:', error);
        res.status(500).json({ error: error.message });
    }
});

// Save meal plan for a user
router.post('/', async (req, res) => {
    try {
        const { userId, breakfast, lunch, dinner } = req.body;
        let mealPlan = await MealPlan.findOne({ userId });
        if (mealPlan) {
            // Update existing meal plan
            mealPlan.breakfast = breakfast || [];
            mealPlan.lunch = lunch || [];
            mealPlan.dinner = dinner || [];
            await mealPlan.save();
        } else {
            // Create new meal plan
            mealPlan = new MealPlan({ userId, breakfast: breakfast || [], lunch: lunch || [], dinner: dinner || [] });
            await mealPlan.save();
        }
        res.json(mealPlan);
    } catch (error) {
        console.error('Error saving meal plan:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;