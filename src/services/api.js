// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getMealPlan = async (userId) => { // Remove date parameter
    const response = await axios.get(`${API_URL}/mealplans/${userId}`);
    return response.data;
};

export const saveMealPlan = async (mealPlan) => {
    const response = await axios.post(`${API_URL}/mealplans`, mealPlan);
    return response.data;
};