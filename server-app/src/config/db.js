import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err.message);
        process.exit(1);
    }
};
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB Discconnected');
    } catch (err) {
        console.error('Failed to disconnect to MongoDB', err.message);
        process.exit(1);
    }
};

export { connectDB, disconnectDB };