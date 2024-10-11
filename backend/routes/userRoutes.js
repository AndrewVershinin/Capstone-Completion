import express from 'express';
import { getUserById, registerUser, getAllUsers, loginUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for registering a new user
router.post('/register', registerUser);

// Route for logging in a user 
router.post('/login', loginUser);

// Route for fetching a user profile by Firebase UID
router.get('/profile', verifyToken, getUserById);

// Route for fetching all users
router.get('/', verifyToken, getAllUsers);

export default router;