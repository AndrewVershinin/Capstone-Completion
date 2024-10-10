import Exercise from "../models/exerciseModel.js";
import User from "../models/userModel.js";

// Create a new exercise
export const createExercise = async (req, res) => {
    const { name, bodyPart, category, instruction } = req.body;

    // Ensure the user is authenticated
    const userId = req.user.uid; // Extract the user ID from Firebase token

    try {
        const exercise = await Exercise.create({
            name, 
            bodyPart,
            category,
            instruction,
            user: userId
        }); // Create and save the document
        res.status(201).json(exercise); // Respond with the created exercise
    } catch (error) {
        res.status(400).json(error); // handle errors
    }
};

// Get all exercises
export const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find(); // Fetch all exercises
        res.status(200).json(exercises); // Respond with the list of exercises
    } catch (error) {
        res.status(400).json(error); // handle errors
    }
};

// Get a specific exercise by ID
export const getExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id); // Find the exercise by ID

        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' })
        }

        res.status(200).json(exercise); // Respond with the found exercise
    } catch (error) {
        res.status(400).json(error); // handle errors
    }
};

// Update an exercise by ID 
export const updateExercise = async (req, res) => {
    try {
        const updetedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update and return the new document

        if (!updateExercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        res.status(200).json(updateExercise); // Respond with the updated exercise
    } catch (error) {
        res.status(400).json(error); // handle errors
    }
};

// Delete an exercise by ID
export const deleteExercise = async (req, res) => {

    try {
        const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);

        if (!deletedExercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        res.status(200).json({ message: 'Exercise deleted successfully', deletedExercise })
    } catch (error) {
        res.status(400).json(error); // handle errors
    }

};

