"use client";
import Image from "next/image";
import Back from "../../component/backfn";
import { FiEdit, FiHeart, FiLock, FiChevronRight } from "react-icons/fi";
import { Card, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import Link from "next/link";
import Star from "@/app/component/Starfn";
import axios from "axios";
import Cookies from "js-cookie";


// ประกาศ Type สำหรับ Favorite Item
type FavoriteItem = {
    _id: string;
    date: string;
    emotion: string;
    story: string;
    isStarred: boolean;
};

export default function Favorite() {
    const [favoriteList, setFavoriteList] = useState<FavoriteItem[]>([]);
    const [username, setUsername] = useState<string>("");
    const [profileImage, setProfileImage] = useState<string>("/public/baby_chick.svg");

    const fetchFavorites = async () => {
        try {
            const response = await axios.get("/api/favorite", {
                headers: {
                    Authorization: `${Cookies.get("token")}`,
                },
            });

            if (response.data.message === "Success") {
                setFavoriteList(response.data.starredEntries);
            } else {
                console.error("Error fetching favorite list:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching favorite list:", error);
        };
    };

    const fetchUserData = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axios.get('/api/users', {
                headers: {
                    Authorization: `${token}`
                }
            });

            if (response.status === 200) {
                setUsername(response.data.username);
                setProfileImage(response.data.profileImage);
            } else {
                console.error("Error fetching user data:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchFavorites();
        fetchUserData();
    }, []);

    const Logout = () => {
        Cookies.remove('token');
        window.location.href = '/';
    }

    return (
        <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image src="/Favorite.jpg" alt="Background" fill className="object-cover" quality={80} priority />
            </div>

            <div className="grid grid-cols-12 pl-20 pt-16 pr-20">
                {/* Back Button */}
                <div className="col-span-1">
                    <Back />
                </div>

                {/* Left Section */}
                <div className="col-span-5 flex flex-col items-center mt-16">
                    {/* Profile Section */}
                    <div className="mb-10">
                        <div className="relative w-[120px] h-[120px] rounded-full flex items-center justify-center">
                            <img src={profileImage} alt="Profile" width={120} height={120} className="object-cover rounded-full" />
                        </div>
                        <h1 className="text-[#696A7C] text-[1.5rem] mt-3 text-center">{username}</h1>
                    </div>

                    {/* Card Section */}
                    <Card className="w-[90%] shadow-lg rounded-2xl bg-white p-5">
                        <CardContent className="space-y-4">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between text-gray-600 cursor-pointer border-b-2 pb-2 px-2">
                                    <Link href="/profile/editProfile" className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-2">
                                            <FiEdit />
                                            <span className="capitalize">Edit profile</span>
                                        </div>
                                        <FiChevronRight />
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between text-gray-600 cursor-pointer border-b-2 bg-[#CCEDFF] py-3 px-2 rounded-[10px]">
                                    <Link href="/profile/favorite" className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-2">
                                            <FiHeart />
                                            <span className="capitalize">Favorite</span>
                                        </div>
                                        <FiChevronRight />
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between text-gray-600 cursor-pointer border-b-2 pb-2 px-2">
                                    <Link href="/profile/changePassword" className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-2">
                                            <FiLock />
                                            <span className="capitalize">Change password</span>
                                        </div>
                                        <FiChevronRight />
                                    </Link>
                                </div>
                            </div>

                            <button onClick={Logout} className="mt-3 bg-[#FFB3AD] text-[#C5524C] h-[40px] rounded-[10px] capitalize w-full font-extrabold">
                                Logout
                            </button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Section - Favorite List */}
                <div className="col-span-6 flex flex-col p-10 pl-16 mt-10 bg-white rounded-2xl shadow-lg relative">
                    <h2 className="text-2xl font-bold text-[#696A7C] text-center pb-3">FAVORITE</h2>

                    {/* Scrollable Favorite List */}
                    <div className="flex flex-col items-center mt-6 space-y-6 overflow-y-auto max-h-[400px] pr-4 scrollbar-thin scrollbar-thumb-[#6DAE81] scrollbar-track-[#C7EAD4]">
                        {favoriteList.length > 0 ? (
                            favoriteList.map((item, index) => (
                                <div key={index} className="w-[100%] relative p-3">
                                    {/* Header Section */}
                                    <div className="bg-[#FFEAC3] p-4 rounded-t-[72px] flex justify-between items-center relative">
                                        <div className="flex items-center space-x-2">
                                            <div className="absolute -top-3 left-14 w-2 h-10 bg-[#FFC65B] rounded-lg"></div>
                                            <div className="absolute -top-3 left-16 w-2 h-10 bg-[#FFC65B] rounded-lg"></div>
                                            <div className="absolute -top-3 right-20 w-2 h-10 bg-[#FFC65B] rounded-lg"></div>
                                            <div className="absolute -top-3 right-16 w-2 h-10 bg-[#FFC65B] rounded-lg"></div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex flex-col px-5 py-2 bg-[#C9EEFF] rounded-b-[40px] min-h-[150px]">
                                        <div className="flex justify-between items-center ">
                                            <span className="text-[#FF7BAC] text-[1.3rem]">{item.date.split('-')[1] + " " + item.date.split('-')[2] + " " + item.date.split('-')[3]}</span>
                                            <Star
                                                contentId={item._id}
                                                isStarred={item.isStarred}
                                                setIsStarred={(newStarred) => {
                                                    setFavoriteList((prevList) =>
                                                        prevList.map((fav) =>
                                                            fav._id === item._id ? { ...fav, isStarred: Boolean(newStarred) } : fav
                                                        )
                                                    );
                                                    return newStarred;
                                                }}
                                            />
                                        </div>

                                        <div className="flex items-center bg-[#FFEAC3] rounded-[45px] p-4 mb-2">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center">
                                                <img src={"/" + item.emotion + ".png"} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                                            </div>

                                            {/* Text Content (รองรับข้อความยาว) */}
                                            <p className="text-gray-600 text-sm ml-4 flex-1 break-words max-w-full">
                                                {item.story}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No favorites added yet.</p>
                        )}
                    </div>


                </div>
            </div>
        </div>
    );
}
