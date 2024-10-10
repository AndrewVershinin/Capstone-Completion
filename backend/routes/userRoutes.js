import express from 'express';
import { getUserById, registerUser, loginUser, logoutUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// Route for registering a new user
router.post('/register', registerUser);

// Route for logging in a user
router.post('/login', loginUser);

// Route for logging out a user
router.post('/logout', logoutUser);

// Route for fetching a user profile by Firebase UID
router.get('/:uid', getUserById);

// Route for fetching all users
router.get('/', getAllUsers);

export default router;