"use client";

import { useState } from "react";
import Image from "next/image";
import { FiAlertTriangle } from "react-icons/fi";

export default function Login() {
  const [error, setError] = useState<React.ReactNode>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    if (!email || !password) {
      setError(
        <span>
          <FiAlertTriangle className="inline mr-2" />
          Check your details and try again
        </span>
      );
    } else {
      setError("");
      console.log("Logging in...");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Login.jpg"
          alt="Background"
          fill
          className="object-cover"
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
      <div className="flex flex-col justify-between items-center flex-1 py-10 mt-16">
        <div className="w-full max-w-md px-6">
          <h1 className="text-center text-[2.25rem] font-extrabold text-[#696A7C] mb-6">Login</h1>
          
          {/* Custom Alert */}
          {error && (
            <div className="bg-[#FFDAD7] border border-[#E66A63] text-[#65090E] px-4 py-3 rounded-[10px] relative mb-4 text-center">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-[1.2rem] text-[#696A7C] mb-2">Email</label>
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
              <label htmlFor="password" className="block text-[1.2rem] text-[#696A7C] mb-2">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-[#C6CED9] text-[#696A7C] rounded-[10px] h-[50px] w-full px-4"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#FFC65B] text-white font-bold text-[1.2rem] rounded-[20px] h-[55px]"
            >
              Login
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-[#696A7C]">
              Don’t have an account?{' '}
              <a href="/signup" className="font-medium text-[#64B7E1] underline">Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
