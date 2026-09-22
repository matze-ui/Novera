import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const ACTS = [
  {
    act: "Act I",
    title: "Shadow",
    when: "Weeks 1–2",
    body: "We sit with the people who actually do the work. Real runs, real screens, real exceptions — plus the system logs and the threads where odd cases get settled. What comes out is a map of the process as performed, which is never the process as documented.",
    outputs: ["A written map of the real workflow", "The exception list nobody had"],
  },
  {
    act: "Act II",
    title: "Rehearse",
    when: "Weeks 3–5",
    body: "We build the agent and run it against your own history — past cases, replayed, with every side effect switched off. You see exactly where it agrees with your team and where it doesn't. Each disagreement becomes a rule, a guardrail, or a case it must escalate.",
    outputs: ["Agreement rate on your real cases", "Rules and escalation thresholds you sign off"],
  },
  {
    act: "Act III",
    title: "Perform",
    when: "Week 6 onward",
    body: "It goes live on a slice of volume first, read-only where it can be, then widens as it earns it. Every action is logged with the reason behind it. When it hits something outside what it learned, it stops and hands a human the full context instead of guessing.",
    outputs: ["Unattended runs with an audit trail", "Escalations that arrive with context"],
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="on-stage relative overflow-hidden bg-stage py-24 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Three acts, then it holds the part"
          lede="An understudy doesn't get handed the role on day one. It learns the part from the person playing it, rehearses until it's right, and only then goes on."
          onStage
        />

        <div className="mt-14 space-y-4">
          {ACTS.map((act, index) => (
            <div
              key={act.act}
              className="grid gap-6 rounded-2xl border border-stage-line bg-stage-raised p-7 sm:p-9 md:grid-cols-[13rem_1fr]"
            >
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="u-display text-4xl text-spot">{index + 1}</span>
                  <span className="u-eyebrow text-dim">{act.act}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] text-chalk">
                  {act.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-dim">{act.when}</p>
              </div>

              <div>
                <p className="text-[0.9375rem] leading-relaxed text-dim">{act.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {act.outputs.map((output) => (
                    <li
                      key={output}
                      className="rounded-full border border-stage-line bg-stage px-3 py-1.5 text-xs text-chalk/85"
                    >
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-dim">
          Timings are what we&rsquo;re designing the pilot around, not a contractual
          promise — the shadow phase is what tells us whether a workflow is a
          two-week job or a two-month one.
        </p>
      </Container>
    </section>
  );
}
