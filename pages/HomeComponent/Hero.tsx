"use client";

import React from "react";
import { motion } from "framer-motion";
import data from "@/content/data.json";

export const Hero: React.FC = () => {
  const { title, description } = data.Home.hero;

  return (
    <section id="hero" className="pt-36 pb-16 md:pt-48 md:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-[60px] font-semibold tracking-tight text-[#1c1c1c] leading-[1.1] mb-6"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg sm:text-xl md:text-[22px] text-[#4d4d4d] max-w-3xl leading-[1.5] font-normal"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
