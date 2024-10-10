import User from "../models/userModel.js"; // Import Firebase Auth instance
import { auth } from "../firebase.js";

// User sign up
export const registerUser = async (req, res) => {
    const { displayName, email, password } = req.body;

    try {
        // Create user in Firebase Auth using Firebase Admin SDK
        const userCredential = await auth.createUser({
            email: email,
            password: password,
            displayName: displayName
        });

        const firebaseUid = userCredential.uid; // get Firebase UID
        const token = await auth.createCustomToken(firebaseUid); // Generate a custom token

        // Save additional user details in MongoDB using create()
        const newUser = await User.create({
            email: userCredential.email, // Use Firebase Auth user email
            displayName,
            password,
            uid: firebaseUid // Save Firebase UID in MongoDB
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser, token })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password); // Calls Firebase's method to log in the user with the provided email and password.

        const token = await userCredential.user.getIdToken(); // Get the token

        res.status(200).json({ message: 'User logged in successfully', user: userCredential.user, token }); // userCredential.user Access the user object from Firebase
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User logout
export const logoutUser = async (req, res) => {
    try {
        await auth.signOut(); // Calls Firebase's method to sign out the currently authenticated user
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch user profile by Firebase UID
export const getUserById = async (req, res) => {
    const { uid } = req.params; // Extract UID from request parameters

    try {
        // Find the user by Firebase UID in MongoDB
        const user = await User.findOne({ uid }).populate('workouts');
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};