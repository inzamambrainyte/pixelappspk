"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import data from "@/content/data.json";
import { useNavbarNavigation } from "@/hooks";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { brandName, logoPath, navLinks, ctaText, ctaLink } = data.Navigation;

  const {
    activeHref,
    setActiveHref,
    setHoveredHref,
    highlightedHref,
  } = useNavbarNavigation();

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

          <div
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {navLinks.map((link) => {
              const isCurrent = highlightedHref === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  onClick={() => setActiveHref(link.href)}
                  className={`relative px-6 py-3 rounded-[50px] text-base transition-colors duration-200 select-none ${
                    isCurrent
                      ? "text-[#46bab4] font-medium"
                      : "text-[#1c1c1c] font-normal hover:text-[#46bab4]"
                  }`}
                >
                  {isCurrent && (
                    <motion.span
                      layoutId="navbar-sliding-pill"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      className="absolute inset-0 rounded-[50px] bg-white/90 shadow-[-3px_-3px_8px_#ffffff,3px_3px_8px_rgba(166,171,189,0.35)] border border-white/60 -z-10"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
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
            {navLinks.map((link) => {
              const isCurrent = activeHref === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setActiveHref(link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-base px-4 py-2 rounded-[50px] transition-colors ${
                    isCurrent
                      ? "text-[#46bab4] font-medium shadow-neu-badge"
                      : "text-[#1c1c1c] font-normal hover:text-[#46bab4]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
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
