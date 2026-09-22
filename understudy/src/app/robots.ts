import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

// Pinned at build time: this is a marketing site, there is nothing
// request-dependent here, and `output: export` requires it.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The signup list is behind auth, but keep it out of crawl paths too.
      disallow: ["/api/", "/admin"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
