"use client";
import Image from "next/image";
import { useState } from "react";
import { FiX, FiArrowRight, FiStar, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import Star from "../component/Starfn";

export default function Diary() {
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);


    const emotions = [
        { name: "Sad", icon: "/sad.png", color: "text-[#00B5E1]", colorCode: "#64B7E1" },
        { name: "Surprise", icon: "/surprise.png", color: "text-[#FF419E]", colorCode: "#FFA6C2" },
        { name: "Happy", icon: "/happy.png", color: "text-[#0E825E]", colorCode: "#8BC8B8" },
        { name: "So so", icon: "/soso.png", color: "text-[#FFBF00]", colorCode: "#FFC65B" },
        { name: "Angry", icon: "/angry.png", color: "text-[#ED3B20]", colorCode: "#FF6940" },
    ];

    return (
        <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image src="/Diary.jpg" alt="Background" fill className="object-cover" quality={80} priority />
            </div>

            <div className="grid grid-cols-12 pl-28 pt-16 pr-28">
                {/* Date Header */}
                <div className="col-span-5 flex flex-col items-center justify-center mt-6 w-[90%] h-[20vh] relative">
                    {/* แง่งด้านบน */}
                    <div className="absolute -top-3 left-6 w-1 h-8 bg-[#FF60C7] rounded-lg"></div>
                    <div className="absolute -top-3 left-10 w-1 h-8 bg-[#FF60C7] rounded-lg"></div>
                    <div className="absolute -top-3 right-6 w-1 h-8 bg-[#FF60C7] rounded-lg"></div>
                    <div className="absolute -top-3 right-10 w-1 h-8 bg-[#FF60C7] rounded-lg"></div>

                    <p className="text-[2.25rem] font-bold flex items-center justify-center h-1/2 bg-[#FFA6C2] w-full rounded-t-lg">
                        December 2024
                    </p>
                    <p className="text-[1.8rem] flex items-center justify-center h-1/2 bg-[#FFCFDD] w-full text-[#696A7C] rounded-b-lg">
                        WED 25
                    </p>
                </div>

                <div className="col-span-6 w-[40vw]">
                    {/* Emotion Selection */}
                    <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-[100%] ">
                        <p className="text-[#FFA6C2] font-semibold text-[1.5rem] mb-3">Choose your emotion</p>
                        <div className="flex justify-between">
                            {emotions.map((emotion) => (
                                <div
                                    key={emotion.name}
                                    className="flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all hover:opacity-100"
                                    onClick={() => setSelectedEmotion(emotion.name)}
                                >
                                    <div
                                        className={`rounded-lg transition-all ${selectedEmotion
                                            ? selectedEmotion === emotion.name
                                                ? "border-4"
                                                : "opacity-40"
                                            : "" // ถ้าไม่มีการเลือก emotion ใดๆ opacity ไม่เปลี่ยน
                                            }`}
                                        style={{
                                            borderColor: selectedEmotion === emotion.name ? emotion.colorCode : "transparent",
                                        }}
                                    >
                                        <Image src={emotion.icon} alt={emotion.name} width={100} height={80} />
                                    </div>
                                    <p className={`text-sm font-medium ${emotion.color}`}>{emotion.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Story Input */}
                    <div className="mt-6 w-[100%]">
                        <div className="flex" >
                            <p className="text-[#FFA6C2] font-semibold mb-2 flex items-center cursor-pointer w-fit text-[1.25rem] " >Your Story</p>
                            <Star />
                        </div>
                        <textarea
                            className="w-full h-40 border-4 border-[#FFA6C2] rounded-lg p-3 focus:outline-none text-[#696A7C] shadow-lg"
                            placeholder="Write Something..."
                            style={{ resize: "none" }} // ป้องกันการขยายขนาด
                        ></textarea>

                    </div>

                    {/* Submit Button - Stick to Bottom Right */}
                    <div className="flex justify-end mt-6 gap-2">
                        <button className="flex items-center p-3 rounded-full text-[#C5524C] bg-[#FFCFDD]">
                            <FiTrash2 size={20} />
                        </button>
                        <button className="flex items-center px-6 py-2 rounded-full text-white bg-[#FFC65B]">
                            Submit <FiArrowRight className="ml-2" />
                        </button>
                    </div>
                </div>

                {/* x Button */}
                <div className="relative">
                    <Link href="/home">
                        <button className="absolute top-0 right-0 w-fit inline-flex p-1">
                            <FiX size={46} className="text-[#696A7C] p-1 rounded-full bg-[#C6CED9]" />
                        </button>
                    </Link>
                </div>



            </div>
        </div>
    );
}
