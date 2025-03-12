"use client"

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function Back() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/home");
  };
  return (
    <button
      onClick={handleBack}
      className="flex items-center justify-center w-20 h-10 bg-[#C6CED9] rounded-full shadow-md"
    >
      <FiArrowLeft className="text-[#696A7C] text-[2rem] " />
    </button>
  );
}
