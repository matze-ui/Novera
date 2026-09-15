import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SearchBar } from "@/components/search/search-bar";
import { PropertyArt } from "@/components/property/property-art";
import { DemoBadge } from "@/components/ui/badge";
import { formatPrice, formatSize } from "@/lib/utils";
import { demoProperties } from "@/lib/demo-properties";

export function Hero() {
  const featured = demoProperties[0];

  return (
    <section className="relative overflow-hidden bg-graphite pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(600px circle at 15% 10%, rgba(65,105,255,0.35), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="animate-fade-up">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-signal">
              Property demand, delivered.
            </p>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your property.
              <br />
              The right people.
              <br />
              One viewing away.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              NOVERA combines modern property marketing, intelligent matching and seamless
              property discovery to connect people with properties that fit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/search" size="lg">
                Find a property
              </Button>
              <Button href="/for-owners" variant="ghost" size="lg" className="border-white/30 text-white hover:border-white">
                Get your property moving
              </Button>
            </div>
            <Button
              href="/how-it-works"
              variant="ghost"
              size="sm"
              className="mt-4 border-transparent px-0 text-white/60 hover:text-white"
            >
              Talk to NOVERA →
            </Button>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <div className="relative aspect-[4/3]">
                <PropertyArt image={featured.images[0]} priority />
                <div className="absolute left-4 top-4">
                  <DemoBadge />
                </div>
              </div>
              <div className="bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-graphite">{featured.title}</p>
                  <span className="rounded-full bg-signal-tint px-2.5 py-1 text-xs font-semibold text-signal-dark">
                    94% match
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {featured.city} · {featured.postalCode}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                  <span>{featured.bedrooms} bed</span>
                  <span>{formatSize(featured.size)}</span>
                  <span className="font-semibold text-graphite">{formatPrice(featured)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <SearchBar />
        </div>
      </Container>
    </section>
  );
}
