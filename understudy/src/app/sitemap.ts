import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

// Pinned at build time: this is a marketing site, there is nothing
// request-dependent here, and `output: export` requires it.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
