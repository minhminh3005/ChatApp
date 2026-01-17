import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // @ts-ignore
        await mongoose.connect(process.env.MONGODB_URI );
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('MongoDB connection error:', error);
        process.exit(1);
    }
}