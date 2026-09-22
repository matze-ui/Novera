import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const PRINCIPLES = [
  {
    title: "It never improvises",
    body: "An agent that guesses confidently is worse than no agent. Outside what it learned, Understudy stops and asks rather than inventing an answer that looks plausible.",
  },
  {
    title: "It shows its work",
    body: "Every run leaves a record: what it read, what it decided, which rule applied, what it changed. If you can't audit it, you can't trust it with anything that matters.",
  },
  {
    title: "You own the part",
    body: "The process map, the decision rules and the documentation are yours to keep — including if you stop working with us. The point is to get the knowledge out of people's heads, not into ours.",
  },
  {
    title: "It knows when to call for a human",
    body: "Escalation is a designed path, not a failure. The case arrives with the full context and the reason it stopped, so picking it up takes a minute, not an investigation.",
  },
  {
    title: "One workflow first",
    body: "We take on a single workflow per company to begin with. Platforms that promise to automate everything tend to automate nothing; one thing running properly beats six things half-running.",
  },
  {
    title: "Scoped access, narrowed blast radius",
    body: "Read-only until it has earned write. Scoped credentials, limits on what a single run can touch, and a kill switch that a non-engineer can reach.",
  },
];

export function Principles() {
  return (
    <section id="principles" className="bg-paper py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Principles"
          title="How we intend to behave"
          lede="Understudy is pre-launch, so treat these as commitments we're building toward and will be held to — not as features already shipped."
        />

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="border-t border-line pt-6">
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">
                {principle.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
