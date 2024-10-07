import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bodyPart: {
        type: String,
        enum: ['Core', 'Arms', 'Back', 'Chest', 'Legs', 'Shoulders', 'Full Body' , 'Cardio', 'Other'],
        required: true
    },
    instruction: {
        type: String,
        trim: true
    },
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;
