import type { MetadataRoute } from "next";
import { demoProperties } from "@/lib/demo-properties";
import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/search",
    "/match",
    "/how-it-works",
    "/for-owners",
    "/for-owners/submit",
    "/premium",
    "/impressum",
    "/datenschutz",
    "/cookie-settings",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.6,
  }));

  const propertyEntries: MetadataRoute.Sitemap = demoProperties
    .filter((p) => p.status === "active")
    .map((p) => ({
      url: `${SITE_URL}/properties/${p.slug}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticEntries, ...propertyEntries];
}
