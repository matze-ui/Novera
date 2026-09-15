import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Gallery } from "@/components/property/gallery";
import { MatchBreakdown } from "@/components/property/match-breakdown";
import { PropertyActions } from "@/components/property/property-actions";
import { PropertyGrid } from "@/components/property/property-grid";
import { demoProperties, getPropertyBySlug } from "@/lib/demo-properties";
import { DEFAULT_MATCH_PREFERENCES, matchProperty } from "@/lib/match";
import { formatDate, formatPrice, formatSize, propertyTypeLabel } from "@/lib/utils";

export function generateStaticParams() {
  return demoProperties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property not found" };

  return {
    title: `${property.title} — ${property.district}, ${property.city}`,
    description: `${propertyTypeLabel(property.propertyType)} in ${property.district}, ${property.city}. ${property.bedrooms} bed, ${formatSize(property.size)}, ${formatPrice(property)}.`,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title: property.title,
      description: property.description,
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const unavailable = property.status !== "active";
  const { score, breakdown } = matchProperty(DEFAULT_MATCH_PREFERENCES, property);

  const similar = demoProperties
    .filter((p) => p.slug !== property.slug && p.status === "active" && p.district === property.district)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: property.title,
    description: property.description,
    numberOfRooms: property.bedrooms,
    floorSize: { "@type": "QuantitativeValue", value: property.size, unitCode: "MTK" },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.city,
      addressRegion: property.district,
      postalCode: property.postalCode,
      addressCountry: "AT",
    },
  };

  return (
    <div className="py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <nav className="mb-6 text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/search" className="hover:text-graphite">
            Find a property
          </Link>{" "}
          / <span className="text-graphite">{property.title}</span>
        </nav>

        {unavailable && (
          <div className="mb-6 rounded-xl border border-warning-tint bg-warning-tint px-4 py-3 text-sm text-warning">
            {property.status === "under-offer"
              ? "This property is currently under offer and may no longer be available."
              : "This property is no longer available."}
          </div>
        )}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Gallery images={property.images} />

            <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Badge tone="outline">{property.listingType === "rent" ? "Rent" : "Buy"}</Badge>
                </div>
                <h1 className="text-2xl font-semibold text-graphite sm:text-3xl">
                  {property.title}
                </h1>
                <p className="mt-1 text-muted">{property.addressLabel}</p>
              </div>
              <p className="text-2xl font-semibold text-graphite">{formatPrice(property)}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-line p-5 sm:grid-cols-4">
              <Fact label="Type" value={propertyTypeLabel(property.propertyType)} />
              <Fact label="Size" value={formatSize(property.size)} />
              <Fact label="Bedrooms" value={String(property.bedrooms)} />
              <Fact label="Bathrooms" value={String(property.bathrooms)} />
            </div>

            <section className="mt-8">
              <h2 className="text-lg font-semibold text-graphite">About this property</h2>
              <p className="mt-3 leading-relaxed text-muted">{property.description}</p>
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-semibold text-graphite">Features</h2>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-graphite">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Fact label="Availability" value={property.availability} />
              <Fact label="Listed" value={formatDate(property.createdAt)} />
            </section>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line p-6">
              <PropertyActions slug={property.slug} title={property.title} />
            </div>

            <MatchBreakdown score={score} breakdown={breakdown} />
            <p className="text-xs text-muted-soft">
              General relevance score.{" "}
              <Link href="/match" className="font-medium text-signal hover:text-signal-dark">
                Run NOVERA Match
              </Link>{" "}
              with your own preferences for a score based on what you actually need.
            </p>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-semibold text-graphite">
              More in {property.district}
            </h2>
            <div className="mt-6">
              <PropertyGrid properties={similar} />
            </div>
          </section>
        )}

        <section className="mt-16 rounded-2xl bg-graphite px-6 py-10 text-center sm:px-10">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Not quite the right fit?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
            Tell NOVERA what you actually need and a member of our team will follow up
            personally as matching properties come up.
          </p>
          <div className="mt-6">
            <Link
              href="/match"
              className="inline-flex items-center justify-center rounded-full bg-signal px-6 py-3 text-sm font-medium text-white hover:bg-signal-dark"
            >
              Tell us what you&rsquo;re looking for
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-soft">{label}</p>
      <p className="mt-1 text-sm font-semibold text-graphite">{value}</p>
    </div>
  );
}
