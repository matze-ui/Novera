import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const COSTS = [
  {
    n: "01",
    title: "It only runs when they do",
    body: "The workflow stops for annual leave, sick days and the 4pm meeting. Volume queues up overnight and someone clears it on Monday, badly.",
  },
  {
    n: "02",
    title: "Nobody can write it down",
    body: "The SOP is eighteen months stale. The real process has forty exceptions that live in one person's judgement and a Slack thread from March.",
  },
  {
    n: "03",
    title: "Automating it already failed",
    body: "The RPA script broke when a vendor changed a button. The no-code flow couldn't handle the exceptions. So it went back to humans, quietly.",
  },
];

export function Problem() {
  return (
    <section className="bg-paper py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="The situation"
          title={
            <>
              The process that makes you money lives in three people&rsquo;s heads.
            </>
          }
          lede="Not in a system, not in a document — in the heads of whoever has done it long enough to know what to do when it goes sideways. That is expensive, fragile, and very hard to hire for."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {COSTS.map((cost) => (
            <div key={cost.n} className="bg-paper-raised p-7">
              <span className="u-eyebrow text-spot-ink">{cost.n}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-ink">
                {cost.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{cost.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
