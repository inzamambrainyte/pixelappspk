import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/pages/HomeComponent/Navbar";
import { Footer } from "@/pages/HomeComponent/Footer";
import data from "@/content/data.json";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(data.config.siteUrl),
  title: data.config.metaTitle,
  description: data.config.metaDescription,
  icons: {
    icon: data.config.favicon,
    apple: data.config.favicon,
  },
  openGraph: {
    title: data.config.ogTitle,
    description: data.config.ogDescription,
    url: data.config.siteUrl,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins antialiased bg-[#ecedf1] text-[#1c1c1c] min-h-screen flex flex-col justify-between">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
