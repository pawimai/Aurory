import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import  Calendar from "@/models/Calendar"; // ✅ Import Model

// 📌 POST Method: เพิ่ม Diary Entry
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { emotion, story, isStarred } = await req.json();
    const date = new Date().toISOString(); // ใช้วันที่ปัจจุบัน

    if (!date || !emotion || !story) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newEntry = new  Calendar({ date, emotion, story, isStarred });
    await newEntry.save();

    return NextResponse.json({ message: "Entry saved", newEntry }, { status: 201 });
  } catch (error) {
    console.error("Error saving entry:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// 📌 GET Method: ดึงข้อมูลทั้งหมดจาก MongoDB
export async function GET() {
  try {
    await connectMongoDB();
    const entries = await  Calendar.find().sort({ date: -1 }); // เรียงลำดับล่าสุดก่อน
    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
