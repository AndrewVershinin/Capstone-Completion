import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bodyPart: {
        type: String,
        enum: ['Core', 'Arms', 'Back', 'Chest', 'Legs', 'Shoulders', 'Full Body', 'Cardio', 'Other'],
        required: true
    },
    category: {
        type: String,
        enum: ['Barbell', 'Dumbbell', 'Machine/Other', 'Weighted Bodyweight', 'Assisted Bodyweight', 'Reps Only', 'Cardio', 'Duration'],
    },
    instruction: {
        type: String,
        trim: true
    },
    user: { // A reference to the user who created the exercise
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
