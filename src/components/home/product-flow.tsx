import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

const steps = [
  { label: "Property", metric: "1 listing", detail: "Submitted by an owner, agent or developer" },
  { label: "Reach", metric: "2,400 views", detail: "Shown to relevant, matched seekers" },
  { label: "Interest", metric: "86 saves", detail: "Seekers save or enquire" },
  { label: "Qualification", metric: "31 qualified", detail: "Budget and fit confirmed" },
  { label: "Viewing", metric: "14 requested", detail: "Viewing requests sent to the owner" },
  { label: "Property moving", metric: "1 outcome", detail: "Let, sold, or under offer" },
];

export function ProductFlow() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How demand becomes a viewing"
          title="Find. Match. View."
          description="Every property that comes through NOVERA moves through the same system — from first listing to a booked viewing. The numbers below are illustrative examples, not live statistics."
        />
        <div className="mt-6">
          <Badge tone="warning">Example numbers</Badge>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {steps.map((step, i) => (
            <div key={step.label} className="relative">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-base font-semibold text-graphite">{step.label}</p>
                <p className="mt-2 text-2xl font-semibold text-graphite">{step.metric}</p>
                <p className="mt-2 text-sm text-muted">{step.detail}</p>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-line lg:block"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
