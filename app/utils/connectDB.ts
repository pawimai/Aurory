import mongoose from "mongoose";

console.log("DATABASE_URL:", process.env.DATABASE_URL);


if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing from .env file");
}

const DATABASE_URL: string = process.env.DATABASE_URL;

const globalWithMongoose = global as typeof globalThis & {
    mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Mongoose> | null;
    };
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
    cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        console.log("Using cached database connection");
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("Connecting to database...");
        cached.promise = mongoose
            .connect(DATABASE_URL, {
                bufferCommands: false,
            })
            .then((mongoose) => {
                console.log("DB connected successfully");
                return mongoose;
            })
            .catch((error) => {
                console.error("DB Connection Error:", error);
                throw error;
            });
    }

    try {
        cached.conn = mongoose.connection;
        return cached.conn;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

export default connectDB;
