// server/models/MealPlan.js
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: [ String ], default: [] },
    videoUrl: { type: String, default: '' },
    likes: { type: Number, default: 0 },
});

const mealPlanSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    breakfast: { type: [ mealSchema ], default: [] },
    lunch: { type: [ mealSchema ], default: [] },
    dinner: { type: [ mealSchema ], default: [] },
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);