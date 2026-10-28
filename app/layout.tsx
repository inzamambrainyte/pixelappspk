import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/pages/HomeComponent/Navbar";
import { Footer } from "@/components/pages/HomeComponent/Footer";
import data from "@/content/data.json";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || data.config.siteUrl;
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: data.config.favicon,
    apple: data.config.favicon,
  },
  robots: {
    index: allowIndexing,
    follow: allowIndexing,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} font-poppins antialiased bg-[#ecedf1] text-[#1c1c1c] min-h-screen flex flex-col justify-between`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
