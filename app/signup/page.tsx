"use client";
import Image from "next/image";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<React.ReactNode>("");
    const [success, setSuccess] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        console.log("Form Data:", formData);

        // ตรวจสอบว่ารหัสผ่านตรงกันหรือไม่
        if (formData.password !== formData.confirmPassword) {
            setError(
                <span>
                    <FiAlertTriangle className="inline mr-2" />
                    Passwords do not match
                </span>
            );
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            console.log("API Response:", data);

            if (!response.ok) {
                setError(
                    <span>
                        <FiAlertTriangle className="inline mr-2" />
                        {data.message || "Something went wrong"}
                    </span>
                );
            } else {
                setSuccess("Registration successful!");
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            }
        } catch (error) {

            console.error("API Error:", error);

            setError(
                <span>
                    <FiAlertTriangle className="inline mr-2" />
                    Failed to connect to server
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

            {/* Logo Icon */}
            <div className="fixed top-4 left-4">
                <img src="/logo.png" alt="Aurory Icon" className="w-14 h-14" />
                <h6 className="text-[#696A7C] font-extrabold text-center">Aurory</h6>
            </div>

            {/* Content Wrapper */}
            <div className="flex flex-col justify-between items-center flex-1 py-10">
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
                        <div className="bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded-[10px] relative mb-4 text-center">
                            {success}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Username Input */}
                        <div>
                            <label htmlFor="name" className="block text-[1.2rem] text-[#696A7C] mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-[#C6CED9] text-[#696A7C] rounded-[10px] h-[50px] w-full px-4"
                                placeholder="Enter your name"
                                required
                                value={formData.name}
                                onChange={handleChange}
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
                                value={formData.email}
                                onChange={handleChange}
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
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Confirm password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-[1.2rem] text-[#696A7C] mb-2">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="bg-gray-50 border border-[#C6CED9] text-[#696A7C] rounded-[10px] h-[50px] w-full px-4"
                                placeholder="Enter confirm password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
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
