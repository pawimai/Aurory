import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { username, email, password, confirmPassword } = await req.json();

        if (!username || !email || !password || !confirmPassword) {
            return NextResponse.json({ message: "Missing required fields" });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ message: "Passwords do not match" });
        }

        const existingUser = await Users.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return NextResponse.json({ message: "Username or Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({ username, email, password: hashedPassword });
        await newUser.save();

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

    } catch (error) {
        console.log("Error saving user:", error);
        return NextResponse.json({ message: "Internal Server Error" });
    }
}
