// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: {
        dietaryRestrictions: { type: [ String ], default: [] }, // e.g., ["vegan", "gluten-free"]
        goals: { type: [ String ], default: [] },              // e.g., ["weight-loss", "muscle-gain"]
        cuisinePreferences: { type: [ String ], default: [] },
        photo: { type: String, default: '' },        // e.g., ["italian", "mexican"]
    },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);