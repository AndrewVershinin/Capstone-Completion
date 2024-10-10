import { auth } from '../firebase.js';

// Middleware to verify Firebase ID Token
export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token with Firebase Admin SDK
        const decodedToken = await auth.verifyIdIdToken(token);
        req.user = decodedToken; // Attach the decoded token to req.user
        console.log('Decoded Token:', decodedToken);
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        console.log('Token verification failed:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}