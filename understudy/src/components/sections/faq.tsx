import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const FAQS = [
  {
    q: "Is Understudy a product or a service?",
    a: "Both, and the service comes first. We do the work of learning your process and building the agent, then it runs on our platform. It is not a tool we hand you and wish you luck with — the whole premise is that mapping the real process is the hard part, and that's the part we do with you.",
  },
  {
    q: "What happens to our data?",
    a: "We work inside your systems with scoped credentials that you grant and can revoke. Your data is not used to train models shared with anyone else. Specific data handling, retention and residency terms get agreed in writing before the shadow phase starts — and if that agreement is a blocker for you, tell us early rather than late.",
  },
  {
    q: "Which tools do you integrate with?",
    a: "Anything with a reasonable API, and browser-driven automation for the systems that don't have one — which, in the workflows we're targeting, is usually at least one of them. Part of the shadow phase is finding out which of your systems are going to be awkward.",
  },
  {
    q: "What happens when it gets something wrong?",
    a: "Three things limit the damage. It runs read-only until it has earned write access. A single run is capped in what it can touch. And every action is logged, so a mistake is traceable and reversible rather than mysterious. When it isn't confident, the case stops and goes to a person with the context attached.",
  },
  {
    q: "Will this replace the people doing the work now?",
    a: "We'd rather not pretend otherwise: automating a workflow changes what the people running it spend their day on. In the pilots we're designing, the aim is to absorb volume the team can't keep up with and hand back the exceptions — but that's a decision you make about your team, not one we make for you. The people who know the process are also the ones we need in the room to build it.",
  },
  {
    q: "How soon could something actually be running?",
    a: "We're designing the pilot around roughly six weeks from first conversation to a live, narrow slice of volume. That's a target based on the shape of these workflows, not a track record — Understudy hasn't run a customer pilot yet, and the waitlist is how you get into the first round.",
  },
  {
    q: "Who's behind this?",
    a: "A small team, pre-launch, building in the open with the first cohort. There's no sales layer to get past — when you join the list you'll be talking to the people writing the software.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-paper py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Questions"
          title="The things people ask first"
          align="center"
        />

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-line border-y border-line">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em] text-ink">
                  {faq.q}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-xl leading-none text-spot-ink transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl pr-10 text-[0.9375rem] leading-relaxed text-muted">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
