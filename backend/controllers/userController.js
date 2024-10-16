import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Exercise from "../models/exerciseModel.js";



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

        // Example exercises array
        const exampleExercises = [
            {
                name: "Push-Up",
                bodyPart: "Chest",
                category: "Weighted Bodyweight",
                instruction: "Place your hands slightly wider than shoulder-width apart and lower your body until your chest nearly touches the floor. Push yourself back up.",
                user: user._id
            },
            {
                name: "Squat",
                bodyPart: "Legs",
                category: "Weighted Bodyweight",
                instruction: "Stand with feet shoulder-width apart. Lower your hips back and down as if sitting in a chair. Keep your chest up and knees behind your toes.",
                user: user._id
            },
            {
                name: "Bicep Curl",
                bodyPart: "Arms",
                category: "Dumbbell",
                instruction: "Hold a dumbbell in each hand with arms extended. Curl the weights towards your shoulders, then lower them back down slowly.",
                user: user._id
            },
            {
                name: "Plank",
                bodyPart: "Core",
                category: "Weighted Bodyweight",
                instruction: "Hold your body in a straight line with forearms on the floor, elbows aligned under shoulders. Engage your core and hold the position.",
                user: user._id
            },
            {
                name: "Jumping Jacks",
                bodyPart: "Full Body",
                category: "Cardio",
                instruction: "Start with feet together and arms at your sides. Jump while spreading your legs and raising your arms overhead. Return to the starting position.",
                user: user._id
            }
        ];

        // Insert example exercises into the Exercise collection
        await Exercise.insertMany(exampleExercises);



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
        const user = await User.findById(userId)
            .populate('exercises')
            .populate('workouts')

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