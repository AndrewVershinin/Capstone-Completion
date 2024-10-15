import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// User sign up
export const registerUser = async (req, res) => {
    const { displayName, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
       

        // Create the user with the hashed password
        const user = await User.create({
            displayName,
            email,
            password
        });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

        console.log('Hashed Password:', hashedPassword);

        res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User login
export const loginUser = async (req, res) => {
    console.log('Login function hit');
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log('User found:', user);
        if (!user) {
            console.log('Invalid email');
            return res.status(401).json({ message: 'Invalid email or password' });
        }


        // Compare the entered password with the hashed password in the database
        const isHashedMatch = await bcrypt.compare(password, user.password);
        
        console.log('Plain Password:', password); // This will log the password entered by the user
        console.log('Hashed Password:', user.password); // This logs the hashed password from the database
        console.log('Password Match:', isHashedMatch); // This logs whether the passwords match (true/false)
        
        if (!isHashedMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        
        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

       

        res.status(200).json({ message: 'User logged in successfully', user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Fetch user profile by Firebase UID
export const getUserById = async (req, res) => {
    const userId = req.userId; // Extract UID from request parameters

    try {
        // Find the user by Firebase UID in MongoDB
        const user = await User.findById(userId).populate('workouts');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
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