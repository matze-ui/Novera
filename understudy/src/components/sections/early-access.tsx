import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const INCLUDED = [
  {
    title: "One workflow, mapped with you",
    body: "The shadow phase runs whether or not you go ahead with the build. You end up with a written map of how the work actually happens.",
  },
  {
    title: "Fixed scope, priced before we start",
    body: "You see the number and what it covers before any work begins. No open-ended discovery billing.",
  },
  {
    title: "You keep the map either way",
    body: "If we look at your process and conclude an agent is the wrong answer, we'll tell you — and the documentation is still yours.",
  },
  {
    title: "A direct line to the builders",
    body: "The cohort is small on purpose. You'll be talking to the people writing the thing, and what you push back on is what gets changed.",
  },
];

export function EarlyAccess() {
  return (
    <section className="bg-paper-sunk py-24 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Early access"
            title="What the first cohort gets"
            lede="We're taking a small number of pilot customers for the first round. Here's what that involves, and what it doesn't."
          />

          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <div key={item.title} className="bg-paper-raised p-6">
                <h3 className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-spot-deep/25 bg-spot-tint/60 p-6 sm:p-7">
          <h3 className="text-[0.9375rem] font-semibold text-ink">
            On pricing, plainly
          </h3>
          <p className="mt-2 max-w-3xl text-[0.9375rem] leading-relaxed text-ink-soft">
            We haven&rsquo;t set prices yet, so there are none on this page. The model
            we&rsquo;re working toward is a fixed fee for the pilot build and a running
            fee once it&rsquo;s live, sized to the workflow. Waitlist members see the
            numbers first, and nothing is charged for joining.
          </p>
        </div>
      </Container>
    </section>
  );
}
