import mongoose from "mongoose";

export async function connectDb() {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("connected")
}