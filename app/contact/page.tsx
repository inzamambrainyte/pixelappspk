import React from "react";
import type { Metadata } from "next";
import { ContactView } from "@/pages/HomeComponent/ContactView";
import data from "@/content/data.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || data.config.siteUrl;

export const metadata: Metadata = {
  title: `Contact Us | ${data.config.siteName}`,
  description: data.Contact.description,
  openGraph: {
    title: `Contact Us | ${data.config.siteName}`,
    description: data.Contact.description,
    url: `${siteUrl}/contact`,
    siteName: data.config.siteName,
    images: [
      {
        url: data.config.ogImage,
        width: 200,
        height: 200,
        alt: `${data.config.siteName} Logo`,
      },
    ],
    locale: data.config.locale,
    type: "website",
  },
};

export const dynamic = "force-static";

export default function ContactPage() {
  return <ContactView />;
}
