import type { MetadataRoute } from "next";
import data from "@/content/data.json";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || data.config.siteUrl;
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  return {
    rules: {
      userAgent: "*",
      allow: allowIndexing ? "/" : undefined,
      disallow: allowIndexing ? "/api/" : "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
