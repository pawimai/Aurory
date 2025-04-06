"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiX, FiArrowRight, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import Star from "../component/Starfn";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

export default function Diary() {
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

    const [isStarred, setIsStarred] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [date, setDate] = useState<string>("");
    const [story, setStory] = useState<string>("");
    const [contentId, setContentId] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        // Fetch the date from the previous page (assuming it's passed via query params)
        const urlParams = new URLSearchParams(window.location.search);
        const dateParam = urlParams.get('date');
        setDate(dateParam || "");

        // Check if the date exists in the database for the current user
        const checkDateExists = async () => {
            try {
                const res = await axios.get('/api/diary?date=' + dateParam, {
                    headers: {
                        Authorization: `${Cookies.get('token')}`
                    }
                });
                if (res.data.length > 0) {
                    setShowDeleteButton(true);
                    setStory(res.data[0].story || "");
                    setSelectedEmotion(res.data[0].emotion || null);
                    setIsStarred(res.data[0].isStarred || false);
                    setContentId(res.data[0]._id);
                } else {
                    setStory("");
                    setSelectedEmotion(null);
                    setIsStarred(false);
                }
            } catch (error) {
                console.error("Error checking date:", error);
            }
        };

        if (dateParam) {
            checkDateExists();
        }
    }, []);

    const handleSubmit = async () => {
        try {
            await axios.post('/api/diary', {
                date,
                emotion: selectedEmotion,
                story,
                isStarred,
            }, {
                headers: {
                    Authorization: `${Cookies.get('token')}`
                }
            }).then(res => {
                if (res.data.message === "Missing required fields") {
                    Swal.fire({
                        title: 'Missing required fields',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    return;
                }

                Swal.fire({
                    title: 'Diary entry saved',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    router.push('/home');
                });

            })
        } catch (error) {
            console.error('Error saving entry:', error);
        }
    };

    const handleDelete = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete('/api/diary?date=' + date, {
                        headers: {
                            Authorization: `${Cookies.get('token')}`
                        }
                    });
                    console.log('Entry deleted');
                    setStory("");
                    setSelectedEmotion(null);
                    setIsStarred(false);
                    setShowDeleteButton(false);

                    Swal.fire({
                        title: 'Diary entry deleted',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        router.push('/home');
                    });
                } catch (error) {
                    console.error('Error deleting entry:', error);
                }
            }
        });
    };

    const emotions = [
        { name: "Sad", icon: "/sad.png", color: "text-[#00B5E1]", colorCode: "#64B7E1" },
        { name: "Surprise", icon: "/Surprise.png", color: "text-[#FF419E]", colorCode: "#FFA6C2" },
        { name: "Happy", icon: "/happy.png", color: "text-[#0E825E]", colorCode: "#8BC8B8" },
        { name: "So so", icon: "/soso.png", color: "text-[#FFBF00]", colorCode: "#FFC65B" },
        { name: "Angry", icon: "/Angry.png", color: "text-[#ED3B20]", colorCode: "#FF6940" },
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
                        {date.split('-')[2] + " " + date.split('-')[3]}
                    </p>
                    <p className="text-[1.8rem] flex items-center justify-center h-1/2 bg-[#FFCFDD] w-full text-[#696A7C] rounded-b-lg">
                        {date.split('-')[0] + " " + date.split('-')[1]}
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
                            <Star contentId={contentId} isStarred={isStarred} setIsStarred={setIsStarred} />
                        </div>
                        <textarea
                            className="w-full h-40 border-4 border-[#FFA6C2] rounded-lg p-3 focus:outline-none text-[#696A7C] shadow-lg"
                            placeholder="Write Something..."
                            style={{ resize: "none" }} // ป้องกันการขยายขนาด
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                        ></textarea>

                    </div>

                    {/* Submit Button - Stick to Bottom Right */}
                    <div className="flex justify-end mt-6 gap-2">
                        {showDeleteButton && (
                            <button className="flex items-center p-3 rounded-full text-[#C5524C] bg-[#FFCFDD]" onClick={handleDelete}>
                                <FiTrash2 size={20} />
                            </button>
                        )}
                        <button
                            className="flex items-center px-6 py-2 rounded-full text-white bg-[#FFC65B]"
                            onClick={handleSubmit}
                        >
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