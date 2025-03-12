"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IonDatetime, setupIonicReact } from "@ionic/react";
import "@ionic/react/css/core.css";
import Link from "next/link";

export default function Home() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setupIonicReact(); // Setup Ionic ให้ทำงานใน Next.js
        setIsMounted(true);
    }, []);

    return (
        <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/Home.jpg"
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

            {/* Profile Section */}
            <div className="absolute top-10 right-10 flex items-center bg-[#FFEAC3] px-4 py-2 rounded-full shadow-md">
                <Link href="/profile" className="flex items-center justify-between w-full space-x-3">
                    <div className="w-9 h-9 rounded-full border-2 border-[#FFC65B] flex items-center justify-center">
                        <Image src="/user-icon.png" alt="User" width={32} height={32} />
                    </div>
                    <span className="text-[#696A7C] font-semibold">Usernameeeee</span>
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex flex-col justify-center items-center h-screen">
                <p className="text-lg font-semibold text-[#696A7C] mb-4">
                    Hey Daniel, how do you feel today?
                </p>

                {/* Calendar */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    {isMounted && (
                        <IonDatetime
                            presentation="date"
                            value="2024-12-01"
                            className="w-[350px] h-[350px]"
                            highlightedDates={[
                                { date: "2024-12-05", textColor: "#800080", backgroundColor: "#ffc0cb" },
                                { date: "2024-12-10", textColor: "#09721b", backgroundColor: "#c8e5d0" },
                                { date: "2024-12-20", textColor: "var(--ion-color-secondary-contrast)", backgroundColor: "var(--ion-color-secondary)" },
                                { date: "2024-12-25", textColor: "red", backgroundColor: "#ffe0e0" },
                            ]}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
