"use client"
import Image from "next/image";
import Back from "../../component/backfn";
import { FiEdit, FiHeart, FiLock, FiChevronRight, FiArrowRight, FiX } from "react-icons/fi";
import { Card, CardContent } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditProfile() {
    const [selectedAvatar, setSelectedAvatar] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [newUsername, setNewUsername] = useState<string>("");
    const [profileImage, setProfileImage] = useState<string>("");

    const avatars = [
        "/baby_chick_sleep.svg",
        "/baby_chick_angry.svg",
        "/baby_chick.svg",
        "/baby_chick_cry.svg",
        "/baby_chick_love.svg",
    ];

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
                setNewUsername(response.data.username);
                setProfileImage(response.data.profileImage);
                setSelectedAvatar(response.data.profileImage);
            } else {
                console.error("Error fetching user data:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const token = Cookies.get('token');
            if (!token) {
                console.error("No token found");
                return;
            }

            if (username === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Username cannot be empty',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

            const response = await axios.put('/api/users', {
                username: newUsername,
                profileImage: selectedAvatar
            }, {
                headers: {
                    Authorization: `${token}`
                }
            });

            if (response.data.message === "Profile updated successfully") {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                setUsername(newUsername);
                setProfileImage(selectedAvatar);

            } else if (response.data.message === "Missing required fields") {
                Swal.fire({
                    icon: 'error',
                    title: 'Something is wrong, please try again',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                console.log("Error updating password:", response.data.message);
            }

        } catch (error) {
            console.log("Error updating password:", error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image src="/Edit Profile.jpg" alt="Background" fill className="object-cover" quality={80} priority />
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
                            <img src={profileImage || "/baby_chick.svg"} alt="Profile" width={120} height={120} className="object-cover" />
                        </div>
                        <h1 className="text-[#696A7C] text-[1.5rem] mt-3 text-center">{username}</h1>
                    </div>

                    {/* Card Section */}
                    <Card className="w-[90%] shadow-lg rounded-2xl bg-white p-5">
                        <CardContent className="space-y-4">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between text-gray-600 cursor-pointer border-b-2 bg-[#CCEDFF] py-3 px-2 rounded-[10px]">
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

                            <button className="mt-3 bg-[#FFB3AD] text-[#C5524C] h-[40px] rounded-[10px] capitalize w-full font-extrabold">
                                Logout
                            </button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Section - Edit Profile */}
                <div className="col-span-6 flex flex-col p-10 pl-16 mt-10 bg-white rounded-2xl shadow-lg relative">
                    <h2 className="text-2xl font-bold text-[#696A7C] text-center pb-3">EDIT PROFILE</h2>

                    {/* Avatar Selection */}
                    <form onSubmit={handleSubmit}>
                        <p className="text-gray-500 mt-3 text-left w-full">Select your avatar</p>
                        <div className="flex space-x-3 mt-2 w-full justify-center">
                            {avatars.map((avatar, index) => (
                                <button type="button" key={index} onClick={() => setSelectedAvatar(avatar)} className={`w-24 h-24 rounded-full p-1 ${selectedAvatar === avatar ? 'border-4 border-yellow-400' : 'border-2 border-transparent'}`}>
                                    <img src={avatar} alt={`Avatar ${index}`} className="w-full h-full rounded-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Name Change */}
                        <div className="flex flex-col items-center mt-8">
                            <div className="relative w-[50%]">
                                <input
                                    className="w-full text-[#696A7C] pb-2 border-b-2 border-[#696A7C] text-center text-[1.5rem] pr-8"
                                    value={ newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                />
                                {username && (
                                    <button onClick={() => setUsername("")} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#C6CED9] rounded-full p-1 ">
                                        <FiX size={16} className="text-[#696A7C]" />
                                    </button>
                                )}
                            </div>
                            <h4 className="text-[#C6CED9] mt-2">Change your name</h4>
                        </div>

                        {/* Submit Button - Stick to Bottom Right */}
                        <div className="absolute bottom-12 right-12">
                            <button className="flex items-center px-6 py-2 rounded-full text-white bg-[#FFC65B]">
                                Submit <FiArrowRight className="ml-2" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
