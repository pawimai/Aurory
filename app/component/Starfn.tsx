"use client";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface StarProps {
    contentId: string;
    isStarred: boolean;
    setIsStarred: Dispatch<SetStateAction<boolean>>;
}

export default function Star({ contentId, isStarred, setIsStarred }: StarProps) {
    const [loading, setLoading] = useState(false);

    const toggleStar = async (e: React.MouseEvent) => {
        e.stopPropagation(); // ป้องกัน event bubbling
        if (!contentId || loading) return; // ถ้ากำลังโหลดอยู่ ไม่ให้กดซ้ำ

        setLoading(true);
        try {
            const response = await axios.post(`/api/favorite`, {
                contentId,
                isStarred: !isStarred
            }, {
                headers: {
                    Authorization: `${Cookies.get('token')}`
                }
            });

            console.log("API Response:", response.data);
            setIsStarred(!isStarred);
        } catch (error) {
            console.error("Failed to update starred status:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className="text-[#FFA6C2] font-semibold mb-2 flex items-center cursor-pointer w-fit"
            onClick={toggleStar}
            disabled={loading} // ปิดปุ่มขณะโหลด
        >
            <span className="ml-1 text-[2rem] inline-flex p-1 relative">
                {loading ? (
                    <div className="absolute w-full h-full flex items-center justify-center">
                        <div className="animate-spin w-5 h-5 border-2 border-[#FF60C7] border-t-transparent rounded-full"></div>
                    </div>
                ) : (
                    isStarred ? <FaStar className="text-[#FF60C7]" /> : <FiStar />
                )}
            </span>
        </button>
    );
}
