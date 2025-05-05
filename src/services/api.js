import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getMealPlan = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/mealplans/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching meal plan:', error.response?.data || error.message);
        throw error;
    }
};

export const saveMealPlan = async (mealPlanData) => {
    try {
        const response = await axios.post(`${API_URL}/mealplans`, mealPlanData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error || 'Failed to fetch profile');
    }
};

export const updateProfile = async (data) => {
    try {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        };

        // Determine if data is FormData (for photo uploads) or plain object (for preferences only)
        const isFormData = data instanceof FormData;

        const response = await axios.put(`${API_URL}/profile`, data, {
            headers: isFormData
                ? headers // Let axios set Content-Type automatically for FormData
                : { ...headers, 'Content-Type': 'application/json' }, // Explicitly set for JSON
        });
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error.response?.data || error.message);
        throw error;
    }
};