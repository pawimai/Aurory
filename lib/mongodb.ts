import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error("❌ MONGODB_URL is missing in .env file");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectMongoDB = async () => {
    if (cached.conn) {
        console.log("⚡ Using cached MongoDB connection");
        return cached.conn;
    }

    try {
        console.log("⏳ Connecting to MongoDB...");
        cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
            bufferCommands: false,
        });

        cached.conn = await cached.promise;
        console.log("✅ Connected to MongoDB");
        return cached.conn;
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB. Check .env and IP Whitelist in MongoDB Atlas.");
    }
};

(global as any).mongoose = cached;
