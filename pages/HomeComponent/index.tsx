"use client";

import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Benefits from "./Benefits";
import About from "./About";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Footer from "./Footer";

export const HomeComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ecedf1] text-[#1c1c1c] selection:bg-[#6d7aff]/20 selection:text-[#6d7aff]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Benefits />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomeComponent;
export { Navbar, Hero, Features, Benefits, About, FAQ, Contact, Footer };
