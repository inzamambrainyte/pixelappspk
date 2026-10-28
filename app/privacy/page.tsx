import React from "react";
import type { Metadata } from "next";
import { LegalView } from "@/pages/HomeComponent/LegalView";
import data from "@/content/data.json";

export const metadata: Metadata = {
  title: "Pixel Apps",
  description: data.config.metaDescription,
};

export const dynamic = "force-static";

export default function PrivacyPage() {
  return <LegalView data={data.Privacy} />;
}
