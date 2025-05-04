// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getMealPlan = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/mealplans/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching meal plan:', error.response?.data || error.message);
        throw error; // Re-throw the error to let the caller handle it
    }
};

export const saveMealPlan = async (userId, mealPlanData) => {
    try {
        const response = await axios.post(`${API_URL}/mealplans`, {
            userId,
            ...mealPlanData,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error saving meal plan:', error.response?.data || error.message);
        throw error;
    }
};

export const getProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error || 'Failed to fetch profile');
    }
};

export const updateProfile = async (preferences) => {
    try {
        const response = await axios.put(`${API_URL}/profile`, preferences, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to update profile');
    }
};