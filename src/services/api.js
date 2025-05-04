// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getMealPlan = async (userId) => {
    const response = await axios.get(`${API_URL}/mealplans/${userId}`);
    return response.data;
};

export const saveMealPlan = async (mealPlan) => {
    const response = await axios.post(`${API_URL}/mealplans`, mealPlan);
    return response.data;
};

// src/services/api.js
export const getProfile = async (token) => {
    const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateProfile = async (token, preferences) => {
    const response = await axios.put(`${API_URL}/profile`, { preferences }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};