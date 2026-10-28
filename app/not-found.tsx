import React from "react";
import Link from "next/link";
import { Navbar } from "@/pages/HomeComponent/Navbar";
import { Footer } from "@/pages/HomeComponent/Footer";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#ecedf1] text-[#1c1c1c] flex flex-col justify-between">
      <Navbar />

      <main className="pt-44 pb-28 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center flex flex-col items-center">
        <div className="bg-[#ecedf1] rounded-[25px] p-10 sm:p-14 shadow-neu-card border border-white/50 w-full flex flex-col items-center">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-[#ecedf1] shadow-neu-badge text-xs font-semibold uppercase tracking-wider text-[#46bab4] mb-6">
            404 Error
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1c1c1c] mb-4">
            Page Not Found
          </h1>

          <p className="text-base text-[#4d4d4d] leading-relaxed mb-8">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[50px] text-base font-normal text-white bg-[#46bab4] hover:bg-black transition-all duration-300 shadow-neu-button active:shadow-neu-button-inset"
          >
            <ArrowLeft size={18} weight="bold" />
            <span>Back to Home</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

