import Exercise from "../models/exerciseModel.js";
import User from "../models/userModel.js";

// Create a new exercise
export const createExercise = async (req, res) => {
    const { name, bodyPart, category, instruction } = req.body;

    try {
        if (!req.userId) {
            return res.status(400).json({ message: "User ID not provided." });
        }

        const exercise = await Exercise.create({
            name,
            bodyPart,
            category,
            instruction,
            user: req.userId, // Attach the user's ID from the token
        });

        const user = await User.findById(req.userId);
        user.exercises.push(exercise._id);
        await user.save();

        res.status(201).json(exercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all exercises
export const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find({ user: req.userId });
        
        res.status(200).json(exercises);
    } catch (error) {
        res.status(400).json(error);
    }
};

// Get a specific exercise by ID
export const getExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);

        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' })
        }

        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json(error);
    }
};

// Update an exercise by ID 
export const updateExercise = async (req, res) => {
    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedExercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        res.status(200).json(updatedExercise);
    } catch (error) {
        res.status(400).json(error);
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
        res.status(400).json(error);
    }

};

