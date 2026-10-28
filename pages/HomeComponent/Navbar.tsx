"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import data from "@/content/data.json";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { brandName, logoPath, navLinks, ctaText, ctaLink } = data.Navigation;

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-[1360px] mx-auto pointer-events-auto">
        <nav className="bg-[#ecedf1] rounded-[50px] shadow-neu-navbar px-3 sm:px-6 py-2.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src={logoPath}
                alt={brandName}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="font-medium text-xl sm:text-2xl text-[#1c1c1c] tracking-tight">
              {brandName}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-6 py-3 rounded-[50px] text-base font-normal text-[#1c1c1c] hover:text-[#46bab4] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <Link
              href={ctaLink}
              className="px-8 py-3.5 rounded-[50px] text-base font-normal text-white bg-[#46bab4] hover:bg-black transition-all duration-300 shadow-neu-button active:shadow-neu-button-inset"
            >
              {ctaText}
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#1c1c1c] hover:text-[#46bab4] shadow-neu-badge transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-5 bg-[#ecedf1] rounded-[25px] shadow-neu-card border border-white/60 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-normal text-[#1c1c1c] hover:text-[#46bab4] px-4 py-2 rounded-[50px] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={ctaLink}
              onClick={() => setMobileMenuOpen(false)}
              className="text-center px-8 py-3 rounded-[50px] text-base font-normal text-white bg-[#46bab4] hover:bg-black transition-all duration-300 shadow-neu-button"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
