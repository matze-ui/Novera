import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const points = [
  {
    title: "Every demo listing is labeled",
    description: "Development inventory carries a visible DEMO badge until real properties are connected.",
  },
  {
    title: "Match scores are explained",
    description: "Every match percentage comes with the weighted breakdown that produced it — never a black box.",
  },
  {
    title: "No fake status",
    description: "A viewing shows as requested, never confirmed, until a real booking exists behind it.",
  },
  {
    title: "Clear contact, always",
    description: "Every enquiry path leads to a real contact method or an honest 'coming soon' — never a dead button.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why trust NOVERA"
          title="Built on clarity, not claims"
          description="We don't use fake reviews, invented partners or manufactured customer counts. Trust comes from transparent product decisions."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {points.map((point) => (
            <div key={point.title} className="flex gap-4">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal-tint text-signal-dark">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 6.5 4.5 9 10 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-graphite">{point.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
