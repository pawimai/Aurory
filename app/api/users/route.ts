import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Users from "@/models/Users";
import Service from "../Service";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();

        const decoded = Service.decodeService(req);

        if ('userId' in decoded) {
            const user = await Users.findById(decoded.userId);
            if (!user) {
                return NextResponse.json({ message: "User not found" });
            }

            return NextResponse.json({ username: user.username, profileImage: user.profileImage }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Invalid token" });
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();

        const { password, confirmPassword } = await req.json();
        const decoded = Service.decodeService(req);

        if (password !== confirmPassword) {
            return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if ('userId' in decoded) {
            const updatedUser = await Users.findOneAndUpdate(
                { _id: decoded.userId },
                { password: hashedPassword },
                { new: true }
            );

            if (!updatedUser) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }

            return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectMongoDB();

        const { username, profileImage } = await req.json();
        const decoded = Service.decodeService(req);

        if (!username || !profileImage) {
            return NextResponse.json({ message: "Missing required fields" });
        }

        if ('userId' in decoded) {
            const updatedUser = await Users.findOneAndUpdate(
                { _id: decoded.userId },
                { username, profileImage },
                { new: true }
            );

            if (!updatedUser) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }

            return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}