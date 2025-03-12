import { NextResponse } from "next/server";
import connectDB from "../../utils/connectDB";
import User from "../models/User";

export async function POST(req: Request) {
    try {
        await connectDB(); // เชื่อมต่อฐานข้อมูล

        const { username, email, password } = await req.json();
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
