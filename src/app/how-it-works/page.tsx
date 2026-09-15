import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ProductFlow } from "@/components/home/product-flow";
import { ProductArchitecture } from "@/components/home/product-architecture";

export const metadata: Metadata = {
  title: "How NOVERA works",
  description:
    "How NOVERA connects property discovery, intelligent matching and demand generation for both property seekers and property owners in Vienna.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <div>
      <section className="bg-graphite py-16 sm:py-24">
        <Container>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-signal">
            How it works
          </p>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Find. Match. View. One system for both sides of the market.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70">
            NOVERA is built around a single idea: demand and supply should find each other
            faster. Here&rsquo;s how that works for property seekers, and for owners, agents
            and developers.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-white py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="For property seekers" title="Find the property that fits" />
              <ol className="mt-6 space-y-4">
                {[
                  "Search or run NOVERA Match with your preferences",
                  "See a transparent match score for every result",
                  "Save properties and searches as you go",
                  "Request a viewing directly from the listing",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-tint text-sm font-semibold text-signal-dark">
                      {i + 1}
                    </span>
                    <span className="text-sm text-graphite">{step}</span>
                  </li>
                ))}
              </ol>
              <Button href="/search" className="mt-6">
                Find a property
              </Button>
            </div>

            <div>
              <SectionHeading eyebrow="For owners, agents & developers" title="Get your property moving" />
              <ol className="mt-6 space-y-4">
                {[
                  "Submit the property in a few guided steps",
                  "NOVERA creates the demand campaign",
                  "Interested people are captured and qualified",
                  "Qualified leads request a viewing",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-tint text-sm font-semibold text-signal-dark">
                      {i + 1}
                    </span>
                    <span className="text-sm text-graphite">{step}</span>
                  </li>
                ))}
              </ol>
              <Button href="/for-owners/submit" className="mt-6">
                Get your property moving
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <ProductFlow />
      <ProductArchitecture />

      <section className="bg-graphite py-16 sm:py-24">
        <Container className="max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-signal">
            What comes next — NOVERA Network
          </p>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            New property meets the people already looking for it
          </h2>
          <p className="mt-4 text-base text-white/70">
            Long term, NOVERA is designed to flip the search around: when a new property is
            listed, the system identifies seekers whose saved preferences already match it,
            and lets them know — before they ever have to search. This is architecture we are
            building toward, not a feature that exists today.
          </p>
        </Container>
      </section>
    </div>
  );
}
