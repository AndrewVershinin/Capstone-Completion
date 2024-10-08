import express from "express";

import { createExercise, getExercises, getExerciseById, updateExercise, deleteExercise } from '../controllers/exerciseController.js';

const router = express.Router();

// Routes
router.post('/', createExercise); // Create a new exercise
router.get('/', getExercises); // Get all exercises
router.get('/:id', getExerciseById); // Get exercise by ID
router.put('/:id', updateExercise); // Update an exercise by ID
router.delete('/:id', deleteExercise); // Delete an exercise by ID

export default router;