import mongoose from "mongoose";

// Function to connect to mongoose database

export const connectDB = async() => {
    try {
        mongoose.connection.on('connected' , () => console.log("Database is connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/chatApp`);
    } catch (e) {
        console.log(e);
    }
} 