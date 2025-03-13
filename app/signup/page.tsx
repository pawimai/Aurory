"use client"
import Image from "next/image";
import { useState } from "react";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import axios from "axios";

export default function Register() {
    const [error, setError] = useState<React.ReactNode>("");
    const [success, setSuccess] = useState<React.ReactNode>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirm-password"),
        };

        try {
            await axios.post('/api/signup', data).then(res => {
                if (res.status === 201) {
                    setError("")
                    setSuccess(
                        <span>
                            <FiCheckCircle className="inline mr-2" />
                            registered successfully!{' '}
                            <u><a href="/">Login Click Me!</a></u>
                        </span>
                    );
                } else {
                    setSuccess("")
                    setError(
                        <span>
                            <FiAlertTriangle className="inline mr-2" />
                            {res.data.message}
                        </span>
                    );
                }
            })
        } catch (error) {
            console.error('Error during registration:', error);
            setSuccess("")
            setError(
                <span>
                    <FiAlertTriangle className="inline mr-2" />
                    Check your details and try again
                </span>
            );
        }
    };

    return (
        <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/Register.jpg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    priority
                />
            </div>

            {/* Logo Icon ติดอยู่มุมซ้ายบนตลอด */}
            <div className="fixed top-4 left-4" >
                <img
                    src="/logo.png"
                    alt="Aurory Icon"
                    className="w-14 h-14"
                />
                <h6 className="text-[#696A7C] font-extrabold text-center" >Aurory</h6>
            </div>

            {/* Content Wrapper */}
            <div className="flex flex-col justify-between items-center flex-1 py-10 ">
                <div className="w-full max-w-md px-6">
                    <h1 className="text-center text-[2.25rem] font-extrabold text-[#696A7C] mb-6">
                        Create Account
                    </h1>

                    {/* Alert Message */}
                    {error && (
                        <div className="bg-[#FFDAD7] border border-[#E66A63] text-[#65090E] px-4 py-3 rounded-[10px] relative mb-4 text-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-[#D1E7DD] border border-[#0F5132] text-[#0F5132] px-4 py-3 rounded-[10px] relative mb-4 text-center">
                            {success}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Username Input */}
                        <div>
                            <label htmlFor="username" className="block text-[1.2rem] text-[#696A7C] mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="bg-gray-50 border border-[#C6CED9] text-[#696A7C] rounded-[10px] h-[50px] w-full px-4"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-[1.2rem] text-[#696A7C] mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-[#C6CED9] text-[#696A7C] rounded-[10px] h-[50px] w-full px-4"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-[1.2rem] text-[#696A7C] mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="bg-gray-50 border border-[#C6CED9] text-[#696A7C] rounded-[10px] h-[50px] w-full px-4"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {/* Confirm password Input */}
                        <div>
                            <label htmlFor="confirm-password" className="block text-[1.2rem] text-[#696A7C] mb-2">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                name="confirm-password"
                                id="confirm-password"
                                className="bg-gray-50 border border-[#C6CED9] text-[#696A7C] rounded-[10px] h-[50px] w-full px-4"
                                placeholder="Enter confirm password"
                                required
                            />
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#FFC65B] text-white font-bold text-[1.2rem] rounded-[20px] h-[55px]"
                        >
                            Register
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-sm text-[#696A7C]">
                            Have an account?{' '}
                            <a href="/" className="font-medium text-[#64B7E1] underline">
                                Log in
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}