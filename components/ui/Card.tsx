"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  StarFour,
  FileDoc,
  Chats,
  Image as ImageIcon,
  Timer,
  Laptop,
  ChartLineUp,
  Wallet,
  UserCircle,
  ArrowsOut,
  Lightning,
  PuzzlePiece,
} from "@phosphor-icons/react";
import { CardItem } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  StarFour,
  FileDoc,
  Chats,
  Image: ImageIcon,
  Timer,
  Laptop,
  ChartLineUp,
  Wallet,
  UserCircle,
  ArrowsOut,
  Lightning,
  PuzzlePiece,
};

export const Card: React.FC<CardItem> = ({
  title,
  description,
  iconName,
  badge,
}) => {
  const IconComponent = iconMap[iconName] || StarFour;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="flex flex-col items-center justify-start text-center p-[30px] bg-[#ecedf1] rounded-[25px] transition-all duration-300 shadow-neu-card hover:shadow-neu-card-hover border border-white/40 h-full gap-6"
    >
      <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center bg-[#ecedf1] shadow-neu-icon text-[#46bab4] shrink-0">
        <IconComponent size={48} weight="regular" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <h3 className="text-xl font-semibold text-[#1c1c1c] tracking-tight">
            {title}
          </h3>
          {badge && (
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#46bab4]/15 text-[#46bab4] border border-[#46bab4]/30">
              {badge}
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base text-[#4d4d4d] leading-relaxed max-w-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default Card;

