import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "For owners, agents & developers",
  description:
    "Submit a property and let NOVERA build the demand campaign, qualify leads, and turn interest into requested viewings.",
  alternates: { canonical: "/for-owners" },
};

const steps = [
  { title: "Submit the property", detail: "A guided, five-step form — type, details, contact, media, review." },
  { title: "NOVERA creates the demand campaign", detail: "Your listing is prepared for discovery and matching." },
  { title: "Interested people are captured", detail: "Seekers save, enquire and engage with the listing." },
  { title: "Leads are qualified", detail: "Budget and fit are checked before anyone reaches you." },
  { title: "Viewings are requested", detail: "Qualified leads request a time to view." },
  { title: "The property moves", detail: "Let, sold, or under offer — the outcome you're after." },
];

const audiences = [
  {
    name: "Owners",
    detail: "List a single property you're selling or renting out yourself.",
  },
  {
    name: "Agents",
    detail: "Bring your active listings to seekers who are already matched to what they want.",
  },
  {
    name: "Developers",
    detail: "Promote units in a development as they become available, individually or as a project.",
  },
];

export default function ForOwnersPage() {
  return (
    <div>
      <section className="bg-graphite py-16 sm:py-24">
        <Container>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-signal">
            For owners, agents & developers
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            We turn properties into viewings.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
            Submit your property once. NOVERA builds the demand campaign, captures and
            qualifies interest, and hands you people who are ready to view.
          </p>
          <Button href="/for-owners/submit" size="lg" className="mt-8">
            Get your property moving
          </Button>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Who it's for" title="Built for every kind of listing" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {audiences.map((a) => (
              <div key={a.name} className="rounded-2xl border border-line p-6">
                <h3 className="text-lg font-semibold text-graphite">{a.name}</h3>
                <p className="mt-2 text-sm text-muted">{a.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="The process" title="From listing to viewing, in six steps" />
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-line bg-white p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <p className="mt-4 font-semibold text-graphite">{step.title}</p>
                <p className="mt-1 text-sm text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
          <Button href="/for-owners/submit" size="lg" className="mt-10">
            Get your property moving
          </Button>
        </Container>
      </section>
    </div>
  );
}
