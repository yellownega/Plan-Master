// server/models/MealPlan.js
const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    userId: String,
    breakfast: {
        name: String,
        ingredients: [ String ],
        videoUrl: String,
        likes: Number,
    },
    lunch: {
        name: String,
        ingredients: [ String ],
        videoUrl: String,
        likes: Number,
    },
    dinner: {
        name: String,
        ingredients: [ String ],
        videoUrl: String,
        likes: Number,
    },
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);