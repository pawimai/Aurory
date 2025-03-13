"use client";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { useState } from "react";

export default function Star() {
    const [isStarred, setIsStarred] = useState(false); // state สำหรับ toggle ดาว
    return (
        <p
            className="text-[#FFA6C2] font-semibold mb-2 flex items-center cursor-pointer w-fit"
            onClick={() => setIsStarred(!isStarred)}
        >
            
            <span className="ml-1 text-[2rem] inline-flex p-1">
                {isStarred ? <FaStar className="text-[#FF60C7]" /> : <FiStar />}
            </span>
        </p>


    );
}