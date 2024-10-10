import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    uid: { // Add Firebase UID field
        type: String,
        required: true,
        unique: true
    },
    workouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout'
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;