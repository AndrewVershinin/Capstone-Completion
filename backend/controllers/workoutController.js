import Workout from "../models/workoutModel.js";
import User from "../models/userModel.js";

// Create a new workout
export const createWorkout = async (req, res) => {
    const { workoutName, exercises, notes } = req.body;

    const userId = req.userId;

    try {
        if (exercises.length === 0) {
            return res.status(400).json({ message: 'Workout must include at least one exercise.' });
        }
        // Create a new workout and associate it with the authenticated user
        const newWorkout = await Workout.create({
            workoutName,
            exercises,
            notes,
            user: userId
        });

        // update the user's workouts array
        const user = await User.findById(userId);
        user.workouts.push(newWorkout._id);
        await user.save();

        res.status(201).json({ message: "Workout created successfully", newWorkout })

    } catch (error) {
        res.status(400).json(error)
    }
};

// Get all workouts
export const getWorkouts = async (req, res) => {
    try {
        console.log('User ID:', req.userId);
        const workouts = await Workout.find({ user: req.userId }).populate({
            path: 'exercises.exercise',
            select: 'name bodyPart category'
        });
        res.status(200).json(workouts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


// Get workout by ID
export const getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id).populate('exercises');
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


        if (!deletedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        res.status(200).json({ message: 'Workout deleted successfully', deletedWorkout });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};