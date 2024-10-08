import express from 'express';
import 'dotenv/config';
// import workoutRoutes from './routes/workoutRoutes.js'

const app = express();



app.use(express.json());

app.get('/', (req, res) => {
    res.json('Hello from server!')
});


export default app