import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const steps = [
  "Submit the property",
  "NOVERA creates the demand campaign",
  "Interested people are captured",
  "Leads are qualified",
  "Viewings are requested",
  "The property moves",
];

export function OwnerCta() {
  return (
    <section className="bg-graphite py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-signal">
            For owners, agents & developers
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            We turn properties into viewings.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            Submit a property once. NOVERA builds the demand campaign, captures interest,
            qualifies the leads, and hands you people who are ready to view.
          </p>
          <Button href="/for-owners/submit" size="lg" className="mt-8">
            Get your property moving
          </Button>
        </div>

        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal text-sm font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-white">{step}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
