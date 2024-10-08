import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('mongoDB connected')
    } catch (error) {
        console.error(e)
    }
}

export default connectDB;