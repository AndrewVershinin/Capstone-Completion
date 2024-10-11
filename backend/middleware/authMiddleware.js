import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using JWT_SECRET
        req.userId = decoded.id; 
        console.log("Verified token, userId:", req.userId);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Failed to authenticate token.' });
    }
};