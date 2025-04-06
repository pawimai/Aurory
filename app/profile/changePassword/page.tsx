"use client"
import Image from "next/image";
import Back from "../../component/backfn";
import { FiEdit, FiHeart, FiLock, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { Card, CardContent } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ChangePassword() {
    const [username, setUsername] = useState<string>("");
    const [profileImage, setProfileImage] = useState<string>("/baby_chick.svg");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const token = Cookies.get('token');
            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axios.post('/api/users', {
                password: newPassword,
                confirmPassword: confirmPassword
            }, {
                headers: {
                    Authorization: `${token}`
                }
            });

            if (response.data.message === "Password updated successfully") {
                Swal.fire({
                    icon: 'success',
                    title: 'Password updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                setNewPassword("");
                setConfirmPassword("");

            } else if (response.data.message === "Passwords do not match") {
                Swal.fire({
                    icon: 'error',
                    title: 'Passwords do not match',
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

    const Logout = () => {
        Cookies.remove('token');
        window.location.href = '/';
    }


    return (
        <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image src="/Change password.jpg" alt="Background" fill className="object-cover" quality={80} priority />
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
                            <img src={profileImage} alt="Profile" width={120} height={120} className="object-cover" />
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
                                <div className="flex items-center justify-between text-gray-600 cursor-pointer border-b-2 pb-2 px-2 ">
                                    <Link href="/profile/favorite" className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-2">
                                            <FiHeart />
                                            <span className="capitalize">Favorite</span>
                                        </div>
                                        <FiChevronRight />
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between text-gray-600 cursor-pointer border-b-2 bg-[#CCEDFF] py-3 px-2 rounded-[10px]">
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

                {/* Right Section - Edit Profile */}
                <div className="col-span-6 flex flex-col p-10 pl-16 mt-10 bg-white rounded-2xl shadow-lg relative text-[#696A7C] text-center">
                    <h2 className="font-bold text-[2rem] " >CHANGE PASSWORD</h2>
                    <h4>Enter your new password below, we’re<br></br> just being extra safe</h4>

                    <div className="flex flex-col justify-center items-center mt-10" >
                        <form className="space-y-5 w-[70%]" onSubmit={handleSubmit}>
                            {/* New Password Input */}
                            <div>
                                <label htmlFor="newPassword" className="block text-[1.2rem] text-[#696A7C] mb-2 text-start">
                                    New password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    id="newPassword"
                                    className="bg-gray-50 border border-2 border-[#C6CED9] text-[#696A7C] rounded-[10px] h-[40px] w-full px-4"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-[1.2rem] text-[#696A7C] mb-2 text-start">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className="bg-gray-50 border border-2 border-[#C6CED9] text-[#696A7C] rounded-[10px] h-[40px] w-full px-4"
                                    placeholder="Enter confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button className="flex justify-between items-center px-6 py-2 rounded-full text-white bg-[#FFC65B] w-full">
                                Submit <FiArrowRight className="ml-2" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
