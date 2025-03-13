"use client"
import Image from "next/image";
import Back from "../component/backfn";
import { FiEdit } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { Card, CardContent } from '@mui/material';
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Profile() {

    const [username, setUsername] = useState<string>("");
    const [profileImage, setProfileImage] = useState<string>("");

    useEffect(() => {
        fetchUserData();
    }, []);

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

    const Logout = () => {
        Cookies.remove('token');
        window.location.href = '/';
    }

    return (
        <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/Profile.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                    quality={80}
                    priority
                />
            </div>

            <div className="grid grid-cols-12 pl-20 pt-16 pr-20">
                {/* Back Button */}
                <div className="col-span-1">
                    <Back />
                </div>

                {/* Main Content */}
                <div className="col-span-5 flex flex-col items-center mt-16">
                    {/* Profile Section */}
                    <div className="mb-10">
                        <div className="relative w-[120px] h-[120px] rounded-full flex items-center justify-center">
                            <img src= { profileImage || "/baby_chick.svg" } alt="Profile" width={120} height={120} className="object-cover" />
                        </div>
                        <h1 className="text-[#696A7C] text-[1.5rem] mt-3 text-center">{ username }</h1>
                    </div>

                    {/* Card Section */}
                    <Card className="w-[90%] shadow-lg rounded-2xl bg-white p-5">
                        <CardContent className="space-y-4">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between text-gray-600 cursor-pointer pb-2 px-2 border-b-2">
                                    <Link href="/profile/editProfile" className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-2">
                                            <FiEdit />
                                            <span className="capitalize">Edit profile</span>
                                        </div>
                                        <FiChevronRight />
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between text-gray-600 cursor-pointer pb-2 px-2 border-b-2">
                                    <Link href="/profile/favorite" className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-2">
                                            <FiHeart />
                                            <span className="capitalize">Favorite</span>
                                        </div>
                                        <FiChevronRight />
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between text-gray-600 cursor-pointer pb-2 px-2 border-b-2">
                                    <Link href="/profile/changePassword" className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-2">
                                            <FiLock />
                                            <span className="capitalize">Change password</span>
                                        </div>
                                        <FiChevronRight />
                                    </Link>
                                </div>
                            </div>

                            <button onClick={() => Logout()} className="mt-3 bg-[#FFB3AD] text-[#C5524C] h-[40px] rounded-[10px] capitalize w-full font-extrabold">
                                Logout
                            </button>
                        </CardContent>
                    </Card>
                </div>

                {/* Empty Column */}
                <div className="col-span-6"></div>
            </div>
        </div>
    );
}