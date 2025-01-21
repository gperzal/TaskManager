import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

let connection = null;

export const connectDB = async () => {
    try {
        if (connection) return connection;
        
        connection = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 20000,
            socketTimeoutMS: 45000,
            useUnifiedTopology: true
        });
        
        console.log('MongoDB Connected');
        return connection;
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        connection = null;
        console.log('MongoDB Disconnected');
    } catch (err) {
        console.error('Failed to disconnect from MongoDB:', err.message);
    }
};