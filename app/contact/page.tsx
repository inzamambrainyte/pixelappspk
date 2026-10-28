import React from "react";
import type { Metadata } from "next";
import { ContactView } from "@/pages/HomeComponent/ContactView";
import data from "@/content/data.json";

export const metadata: Metadata = {
  title: "Contact Us | Pixel Apps",
  description: data.Contact.description,
};

export const dynamic = "force-static";

export default function ContactPage() {
  return <ContactView />;
}

