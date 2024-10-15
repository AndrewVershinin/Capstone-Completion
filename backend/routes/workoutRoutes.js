import express from "express";
import { getWorkouts, getWorkoutById, createWorkout, deleteWorkout, updateWorkout } from "../controllers/workoutController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router()

// Routes
router.post('/', verifyToken, createWorkout); // Create a new workout
router.get('/', verifyToken, getWorkouts); // Get all workouts
router.get('/:id', verifyToken, getWorkoutById); // Get workout by ID
router.put('/:id', verifyToken, updateWorkout); // Update a workout by ID
router.delete('/:id', verifyToken, deleteWorkout); // Delete a workout by ID

export default router;