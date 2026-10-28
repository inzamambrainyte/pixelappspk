"use client";

import React from "react";
import { motion } from "framer-motion";
import { LegalContent } from "@/types";

interface LegalViewProps {
  data: LegalContent;
}

export const LegalView: React.FC<LegalViewProps> = ({ data }) => {
  const title = data?.title || "";
  const blocks = data?.blocks || [];

  const renderTextWithLinks = (text: string) => {
    if (text.includes("info@pixelappspk.com")) {
      const parts = text.split("info@pixelappspk.com");
      return (
        <span>
          {parts[0]}
          <a
            href="mailto:info@pixelappspk.com"
            className="text-[#46bab4] underline hover:text-[#1c1c1c] transition-colors"
          >
            info@pixelappspk.com
          </a>
          {parts[1]}
        </span>
      );
    }
    return text;
  };

  return (
    <main className="w-full flex-grow pt-36 sm:pt-44 pb-24 px-6 sm:px-10 lg:px-12 max-w-[1300px] mx-auto flex flex-col items-center">
      <motion.div
        initial={{
          opacity: 0.001,
          scale: 0.9,
          y: 80,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 1.8,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full max-w-[1000px] text-center mb-10 sm:mb-14"
      >
        <h1 className="text-4xl sm:text-5xl md:text-[60px] font-semibold text-[#1c1c1c] tracking-tight">
          {title}
        </h1>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0.001,
          scale: 0.9,
          y: 80,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 1.8,
          delay: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full max-w-[1300px] text-left text-lg sm:text-[22px] leading-[1.5] text-[#4d4d4d] space-y-6"
      >
        {blocks.map((block, idx) => {
          if (block.type === "heading") {
            return (
              <h2
                key={idx}
                className="text-xl sm:text-[22px] font-semibold text-[#1c1c1c] pt-4"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === "list" && block.items) {
            return (
              <ul
                key={idx}
                className="list-disc pl-8 space-y-2 text-lg sm:text-[22px] leading-[1.5]"
              >
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{renderTextWithLinks(item)}</li>
                ))}
              </ul>
            );
          }

          return (
            <p key={idx} className="text-lg sm:text-[22px] leading-[1.5]">
              {block.text ? renderTextWithLinks(block.text) : ""}
            </p>
          );
        })}
      </motion.div>
    </main>
  );
};

export default LegalView;
