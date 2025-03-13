import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Service from "../Service";
import Calendar from "@/models/Calendar";

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        const { contentId, isStarred } = await request.json();
        const decoded = Service.decodeService(request);

        if (!contentId) {
            return NextResponse.json({ message: "Missing required parameter: contentId" }, { status: 400 });
        }

        if ('userId' in decoded) {
            // ค้นหาเอนทรีที่มี contentId ตรงกันและอัปเดต isStarred
            const updatedEntry = await Calendar.findOneAndUpdate(
                { _id: contentId, user: decoded.userId }, // ค้นหาตาม `contentId`
                { isStarred }, // อัปเดต isStarred
                { new: true } // คืนค่าเอนทรีที่อัปเดตแล้ว
            );

            if (!updatedEntry) {
                return NextResponse.json({ message: "Entry not found" }, { status: 404 });
            }

            return NextResponse.json({ message: "Entry updated", updatedEntry }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

    } catch (error) {
        console.error("Error updating entry:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectMongoDB();
        const decoded = Service.decodeService(request);

        if ('userId' in decoded) {
            // ค้นหาข้อมูลจาก MongoDB ที่มี isStarred = true
            const starredEntries = await Calendar.find({ user: decoded.userId, isStarred: true });

            return NextResponse.json({message: "Success", starredEntries: starredEntries});
        } else {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }
    } catch (error) {
        console.error("Error fetching starred entries:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
