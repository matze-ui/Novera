import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PropertyGrid } from "@/components/property/property-grid";
import { demoProperties } from "@/lib/demo-properties";

export function FeaturedProperties() {
  const featured = demoProperties.filter((p) => p.status === "active").slice(0, 3);

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="In Vienna now"
            title="A first look at what's on NOVERA"
            description="A selection of current listings. Tell us what you're looking for and we'll match you personally as new properties come in."
          />
          <Link href="/search" className="text-sm font-semibold text-signal hover:text-signal-dark">
            View all properties →
          </Link>
        </div>
        <div className="mt-10">
          <PropertyGrid properties={featured} />
        </div>
      </Container>
    </section>
  );
}
