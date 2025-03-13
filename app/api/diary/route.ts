import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Calendar from "@/models/Calendar";
import Service from "../Service";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { date, emotion, story, isStarred } = await req.json();
        const decoded = Service.decodeService(req);

        if (!date || !emotion || !story) {
            return NextResponse.json({ message: "Missing required fields" });
        }

        if ('userId' in decoded) {
            // ค้นหาเอนทรีที่มีวันที่ตรงกันและอัปเดต ถ้าไม่มีให้สร้างใหม่
            const updatedEntry = await Calendar.findOneAndUpdate(
                { date, user: decoded.userId }, // ค้นหาตาม `date`
                { emotion, story, isStarred }, // อัปเดตข้อมูล
                { new: true, upsert: true } // ถ้าไม่มี ให้สร้างใหม่
            );

            return NextResponse.json({ message: "Entry saved or updated", updatedEntry }, { status: 200 });
        }
    } catch (error) {
        console.error("Error saving entry:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectMongoDB();

        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");
        const decoded = Service.decodeService(request);

        if (!date) {
            return NextResponse.json({ message: "Missing required parameter: date" }, { status: 400 });
        }

        if ('userId' in decoded) {
            // ค้นหาข้อมูลจาก MongoDB ตามวันที่ที่รับมา
            const entries = await Calendar.find({ date, user: decoded.userId });

            return NextResponse.json(entries, { status: 200 });
        } else {
            return NextResponse.json({ message: "Invalid token" });
        }

    } catch (error) {
        console.error("Error fetching entries:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectMongoDB();

        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");
        const decoded = Service.decodeService(request);

        if (!date) {
            return NextResponse.json({ message: "Missing required parameter: date" }, { status: 400 });
        }

        if ('userId' in decoded) {
            // ค้นหาข้อมูลจาก MongoDB ตามวันที่ที่รับมา
            const deletedEntry = await Calendar.deleteMany({ date });

            return NextResponse.json({ message: "Entries deleted", deletedEntry }, { status: 200 });
        }

    } catch (error) {
        console.error("Error fetching entries:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
