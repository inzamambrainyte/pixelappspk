"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "./Card";
import data from "@/content/data.json";

export const Benefits: React.FC = () => {
  const { title, subtitle, items } = data.Home.benefits;

  return (
    <section id="benefits" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col items-center">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-[#ecedf1] shadow-neu-badge text-xs font-semibold uppercase tracking-wider text-[#46bab4] mb-4">
            Benefits
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[45px] font-semibold tracking-tight text-[#1c1c1c] leading-[1.4] mb-4">
            {title.startsWith("Benefits") ? (
              <>
                Benefits <span className="text-[#46bab4]">{title.replace("Benefits", "").trim()}</span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-base sm:text-lg text-[#4d4d4d] leading-relaxed">
            {subtitle}
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Card {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
