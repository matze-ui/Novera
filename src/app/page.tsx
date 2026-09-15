import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { OwnerCta } from "@/components/home/owner-cta";
import { TrustSection } from "@/components/home/trust-section";

export const metadata: Metadata = {
  title: "NOVERA — Property demand, delivered",
  description:
    "NOVERA combines property discovery, intelligent matching and demand generation to connect property seekers in Vienna with properties that fit — and help owners get properties moving.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <OwnerCta />
      <TrustSection />
    </>
  );
}
