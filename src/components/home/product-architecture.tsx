import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  {
    name: "NOVERA Discover",
    tagline: "Property search",
    description: "Fast, filterable search across every active listing on the platform.",
    status: "Available",
  },
  {
    name: "NOVERA Match",
    tagline: "Intelligent matching",
    description: "A transparent, weighted relevance score between a seeker's preferences and available properties.",
    status: "Available",
  },
  {
    name: "NOVERA Flow",
    tagline: "Lead → viewing workflow",
    description: "Captures interest, qualifies it, and turns it into a requested viewing for the owner.",
    status: "Foundation",
  },
  {
    name: "NOVERA Studio",
    tagline: "Property content & marketing",
    description: "The tools that turn a submitted property into a campaign that reaches the right seekers.",
    status: "Planned",
  },
  {
    name: "NOVERA Network",
    tagline: "The long-term demand network",
    description: "Learns what people are looking for so new inventory finds its match automatically.",
    status: "Planned",
  },
];

export function ProductArchitecture() {
  return (
    <section className="border-t border-line bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="One system, five parts"
          title="The NOVERA product architecture"
          description="Discovery, matching, the lead-to-viewing workflow, property marketing and the long-term demand network are built as one connected system — not five separate products."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {pillars.map((pillar) => (
            <div
              key={pillar.name}
              className="flex flex-col rounded-2xl border border-line p-6"
            >
              <span
                className={
                  pillar.status === "Available"
                    ? "w-fit rounded-full bg-success-tint px-2.5 py-1 text-xs font-semibold text-success"
                    : pillar.status === "Foundation"
                      ? "w-fit rounded-full bg-signal-tint px-2.5 py-1 text-xs font-semibold text-signal-dark"
                      : "w-fit rounded-full bg-line-soft px-2.5 py-1 text-xs font-semibold text-muted"
                }
              >
                {pillar.status}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-graphite">{pillar.name}</h3>
              <p className="mt-1 text-sm font-medium text-signal">{pillar.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
