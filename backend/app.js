import express from 'express';
import 'dotenv/config';
import workoutRoutes from './routes/workoutRoutes.js'
import exerciseRoutes from './routes/exerciseRoutes.js'
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

const app = express();

// Enable CORS for all requests or specific domains
app.use(cors({
    credentials: true
}))

// Middleware
app.use(express.json());

// Define API routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/users', userRoutes);

app.get('/api', (req, res) => {
    res.send('Hello from server!')
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

export default app