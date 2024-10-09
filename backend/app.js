import express from 'express';
import 'dotenv/config';
import workoutRoutes from './routes/workoutRoutes.js'
import exerciseRoutes from './routes/exerciseRoutes.js'

const app = express();


// Middleware
app.use(express.json());

// Define API routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);

app.get('/', (req, res) => {
    res.send('Hello from server!')
});


export default app