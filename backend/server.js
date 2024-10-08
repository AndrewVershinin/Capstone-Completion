import app from "./app.js";
import 'dotenv/config';
import connectDB from "./config/db.js";


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Connect to mongoDB
    connectDB();
});
