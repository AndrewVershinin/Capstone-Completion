import express from "express";
import { createExercise, getExercises, getExerciseById, updateExercise, deleteExercise } from '../controllers/exerciseController.js';
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post('/', verifyToken, createExercise); // Create a new exercise
router.get('/', verifyToken, getExercises); // Get all exercises
router.get('/:id', verifyToken, getExerciseById); // Get exercise by ID
router.put('/:id', verifyToken, updateExercise); // Update an exercise by ID
router.delete('/:id', verifyToken, deleteExercise); // Delete an exercise by ID

export default router;