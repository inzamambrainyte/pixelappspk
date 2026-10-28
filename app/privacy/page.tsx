import React from "react";
import type { Metadata } from "next";
import { LegalView } from "@/components/pages/HomeComponent/LegalView";
import data from "@/content/data.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || data.config.siteUrl;

export const metadata: Metadata = {
  title: `Privacy Policy | ${data.config.siteName}`,
  description: data.config.metaDescription,
  openGraph: {
    title: `Privacy Policy | ${data.config.siteName}`,
    description: data.config.metaDescription,
    url: `${siteUrl}/privacy`,
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

export default function PrivacyPage() {
  return <LegalView data={data.Privacy} />;
}
