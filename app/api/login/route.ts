import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { email, password } = await req.json();

        if ( !email || !password ) {
            return NextResponse.json({ message: "Missing required fields" });
        }

        try {
            let user = await Users.findOne({ email });
            if (!user) {
              return NextResponse.json({ message: "Invalid Email" });
            }
        
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
              return NextResponse.json({ message: "Incorrect Password" });
            }
        
            const token = jwt.sign({ userId: user._id }, process.env.secret_key || "Devmode", { expiresIn: "7d" });
        
            return NextResponse.json({ token }, { status: 200 });
          } catch (error) {
            return NextResponse.json({ message: "Server error" });
          }
          
    } catch (error) {
        console.error("Error saving entry:", error);
        return NextResponse.json({ message: "Internal Server Error" });
    }
}