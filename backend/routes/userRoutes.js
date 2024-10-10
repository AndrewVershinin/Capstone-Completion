import express from 'express';
import { getUserById, registerUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// Route for registering a new user
router.post('/register', registerUser);

// Route for fetching a user profile by Firebase UID
router.get('/:uid', getUserById);

// Route for fetching all users
router.get('/', getAllUsers);

export default router;