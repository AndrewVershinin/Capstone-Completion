import axios from 'axios';

// Create an instance of Axios with the base URL
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Helper function to get the token
const getToken = () => {
    return localStorage.getItem('token'); // Retrieve the token from localStorage
};

// === Exercise ===

// Fetch all exercises
export const getExercises = async () => {
    try {
        const response = await api.get('/exercises', {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching exercises:', error);
        throw error;
    }
};

// Fetch one exercise by ID
export const getExerciseById = async (id) => {
    try {
        const response = await api.get(`/exercises/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching exercise by ID:', error);
        throw error;
    }
};

// Create a new exercise
export const createExercise = async (exerciseData) => {
    try {
        const response = await api.post('/exercises', exerciseData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating exercise:', error);
        throw error;
    }
};

// Update an existing exercise
export const updateExercise = async (exerciseId, exerciseData) => {
    try {
        const response = await api.put(`/exercises/${exerciseId}`, exerciseData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating exercise:', error);
        throw error;
    }
};

// Delete an exercise
export const deleteExercise = async (exerciseId) => {
    try {
        const response = await api.delete(`/exercises/${exerciseId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting exercise:', error);
        throw error;
    }
};

// === Workout CRUD ===

// Fetch all workouts
export const getWorkouts = async () => {
    try {
        const response = await api.get('/workouts', {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching workouts:', error);
        throw error;
    }
};

// Create a new workout
export const createWorkout = async (workoutData) => {
    try {
        const response = await api.post('/workouts', workoutData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating workout:', error);
        throw error;
    }
};

// Update a workout
export const updateWorkout = async (workoutId, workoutData) => {
    try {
        const response = await api.put(`/workouts/${workoutId}`, workoutData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating workout:', error);
        throw error;
    }
};

// Delete a workout
export const deleteWorkout = async (workoutId) => {
    try {
        const response = await api.delete(`/workouts/${workoutId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting workout:', error);
        throw error;
    }
};

// ===User Authentication & Profile ===

// Fetch user profile by ID
export const getUserProfile = async () => {
    try {
        const response = await api.get(`/users/profile`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// User Registration (Sign up)
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/users/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// User Login (Sign in)
export const loginUser = async (userData) => {
    try {
        const response = await api.post('/users/login', userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

