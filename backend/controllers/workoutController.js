import Workout from "../models/workoutModel.js";
import User from "../models/userModel.js";

// Create a new workout
export const createWorkout = async (req, res) => {
    const { workoutName, exercises, notes } = req.body;

    // Ensure the user is authenticated
    const userId = req.user.uid;

    try {
        if (exercises.length === 0) {
            return res.status(400).json({ message: 'Workout must include at least one exercise.' });
        }
        // Create a new workout and associate it with the authenticated user
        const newWorkout = await Workout.create({ 
            workoutName, 
            exercises, 
            notes,
            user: userId // Associate the workout with the user's ID
        });

        // update the user's workouts array
        const user = await User.findById(userId);
        user.workouts.push(newWorkout._id);
        await user.save();

        res.status(201).json({ message: "Workout created successfully", newWorkout })

    } catch (error) {
        res.status(400).json(error) // handle errors
    }
};

// Get all workouts
export const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find().populate('exercises') // include full exercise details in response
        res.status(200).json(workouts)
    } catch (error) {
        res.status(500).json({ message: error.message }) // handle errors
    }
};

// Get workout by ID
export const getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id).populate('exercises'); // include full exercise details in response
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' })
        }

        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// Updete workout 
export const updateWorkout = async (req, res) => {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Check if the workout was found and updated
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json(updatedWorkout)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// Delete workout
export const deleteWorkout = async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);

        // Check if the workout was found and deleted
        if (!deletedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        res.status(200).json({ message: 'Workout deleted successfully', deletedWorkout });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};