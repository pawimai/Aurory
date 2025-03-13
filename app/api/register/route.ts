import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await connectMongoDB();

        const { name, email, password } = await req.json();
        console.log("Form Data Received:", { name, email, password });

        
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            console.log("Email already exists:", email);
            return NextResponse.json(
                { message: "Email already in use." },
                { status: 400 }
            );
        }

        
        if (!password || password.length < 6) {
            console.log("Password too short");
            return NextResponse.json(
                { message: "Password must be at least 6 characters long." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

    
        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        console.log("User created successfully:", newUser);

        return NextResponse.json(
            { message: "User registered successfully!" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error in signup API:", error);
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}

