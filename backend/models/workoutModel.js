import mongoose from "mongoose";
import Exercise from "./exerciseModel";

const exerciseSetSchema = mongoose.Schema({
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Exercise,
        required: true
    },
    sets: {
        type: Number,
        required: true,
        min: 1
    },
    reps: {
        type: Number,
        required: true,
        min: 1
    }

});

const workoutSchema = mongoose.Schema({
    workoutName: {
        type: String,
        required: true,
        trim: true
    },
    exercises: [exerciseSetSchema],
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema)

export default Workout;
