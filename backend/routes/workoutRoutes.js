import express from "express";
import { getWorkouts, getWorkoutById, createWorkout, deleteWorkout, updateWorkout } from "../controllers/workoutController";

const router = express.Router()

// Routes
router.post('/', createWorkout); // Create a new workout
router.get('/', getWorkouts); // Get all workouts
router.get('/:id', getWorkoutById); // Get workout by ID
router.put('/:id', updateWorkout); // Update a workout by ID
router.delete('/:id', deleteWorkout); // Delete a workout by ID

export default router;