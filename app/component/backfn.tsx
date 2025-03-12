"use client"

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function Back() {
    const router = useRouter();

    // ฟังก์ชันย้อนกลับ
    const handleBack = () => {
        if (window.history.length > 1) {
            router.back(); // กลับไปหน้าก่อนหน้า
        } else {
            router.push("/"); // ถ้าไม่มีหน้าก่อนหน้า ให้ไปหน้าแรก
        }
    };
    return (
        <button
            onClick={handleBack}
            className="flex items-center justify-center w-20 h-10 bg-[#C6CED9] rounded-full shadow-md"
        >
            <FiArrowLeft className="text-[#696A7C] text-[2rem] " />
        </button>
    );
}