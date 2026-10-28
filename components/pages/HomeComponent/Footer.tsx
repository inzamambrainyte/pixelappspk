"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LinkedinLogo,
  TwitterLogo,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react";
import data from "@/content/data.json";

interface SocialItem {
  id: string;
  name: string;
  href: string;
  icon: React.ElementType;
  bgStyle: React.CSSProperties;
}

export const Footer: React.FC = () => {
  const { brandName, logoPath, copyright, links, socials } = data.Footer;

  const socialItems: SocialItem[] = [
    {
      id: "linkedin",
      name: "LinkedIn",
      href: socials.linkedin,
      icon: LinkedinLogo,
      bgStyle: { backgroundColor: "rgb(0, 119, 181)" },
    },
    {
      id: "twitter",
      name: "Twitter",
      href: socials.twitter,
      icon: TwitterLogo,
      bgStyle: { backgroundColor: "rgb(29, 161, 242)" },
    },
    {
      id: "instagram",
      name: "Instagram",
      href: socials.instagram,
      icon: InstagramLogo,
      bgStyle: {
        background:
          "linear-gradient(45deg, rgb(249, 206, 52) 0%, rgb(238, 42, 123) 50%, rgb(98, 40, 215) 100%)",
      },
    },
    {
      id: "facebook",
      name: "Facebook",
      href: socials.facebook,
      icon: FacebookLogo,
      bgStyle: { backgroundColor: "rgb(24, 119, 242)" },
    },
  ];

  const bgVariants = {
    rest: {
      width: 5,
      height: 5,
      opacity: 0,
      scale: 0,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 60,
        mass: 1,
      },
    },
    hover: {
      width: 80,
      height: 80,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 60,
        mass: 1,
      },
    },
  };

  const iconVariants = {
    rest: {
      color: "rgb(28, 28, 28)",
      transition: { duration: 0.2 },
    },
    hover: {
      color: "rgb(255, 255, 255)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <footer className="w-full bg-[#ecedf1] py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden shrink-0 flex items-center justify-center">
            <Image
              src={logoPath}
              alt={brandName}
              width={50}
              height={50}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-2xl text-[#1c1c1c] tracking-tight">
            {brandName}
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-6 py-1.5 text-base text-[#1c1c1c]">
          {links.map((link) => {
            const isExternal = link.href.startsWith("http");
            if (isExternal) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#46bab4] transition-colors duration-200"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#46bab4] transition-colors duration-200"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
          <p className="text-base text-[#1c1c1c] order-2 md:order-1 text-center md:text-left">
            {copyright}
          </p>

          <div className="flex items-center gap-[15px] order-1 md:order-2">
            {socialItems.map((item) => {
              const IconComp = item.icon;
              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="relative w-[70px] h-[70px] rounded-[50px] bg-[#ecedf1] shadow-neu-button flex items-center justify-center overflow-hidden cursor-pointer shrink-0"
                >
                  <motion.div
                    variants={bgVariants}
                    style={item.bgStyle}
                    className="absolute rounded-full pointer-events-none"
                  />
                  <motion.span
                    variants={iconVariants}
                    className="relative z-10 flex items-center justify-center"
                  >
                    <IconComp size={28} weight="regular" />
                  </motion.span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
