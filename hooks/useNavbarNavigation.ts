"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useNavbarNavigation = (
  sectionIds: string[] = ["services", "benefits", "about-us", "faq"]
) => {
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHref(null);
      return;
    }

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveHref("/#faq");
        return;
      }

      if (window.scrollY < 120) {
        setActiveHref(null);
        return;
      }

      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            current = `/#${id}`;
            break;
          }
        }
      }

      setActiveHref(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, sectionIds]);

  const highlightedHref = hoveredHref ?? activeHref;

  return {
    activeHref,
    setActiveHref,
    hoveredHref,
    setHoveredHref,
    highlightedHref,
  };
};

export default useNavbarNavigation;

