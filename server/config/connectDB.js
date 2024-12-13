import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URI) {
    throw new Error("Please provide MONOGDB_URI in the .env file");
}

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
         console.log("mongodb connected");
        }

    catch(err) {
        console.log("mongodb connecet error", err);
        process.exit(1);
    }
}

export default connectDB;