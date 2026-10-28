import type { Metadata } from "next";
import { Hero } from "@/components/pages/HomeComponent/Hero";
import { Features } from "@/components/pages/HomeComponent/Features";
import { Benefits } from "@/components/pages/HomeComponent/Benefits";
import { About } from "@/components/pages/HomeComponent/About";
import { FAQ } from "@/components/pages/HomeComponent/FAQ";
import data from "@/content/data.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || data.config.siteUrl;

export const metadata: Metadata = {
  title: data.config.metaTitle,
  description: data.config.metaDescription,
  openGraph: {
    title: data.config.ogTitle,
    description: data.config.ogDescription,
    url: siteUrl,
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

export default function Page() {
  return (
    <main className="flex-grow">
      <Hero />
      <Features />
      <Benefits />
      <About />
      <FAQ />
    </main>
  );
}
