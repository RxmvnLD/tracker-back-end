import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(`🍃 Database connected to ${process.env.MONGODB_URI} 🍃`);
    } catch (error) {
        console.log("Error connecting to database");
    }
};

export default connectDB;
