import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { LAUNCH_WINDOW } from "@/lib/config";

/**
 * Illustrative only — this is a sketch of what a workflow looks like once
 * Understudy has learned it, not a screenshot and not customer data. The
 * caption underneath says so, because the product doesn't exist yet.
 */
function RehearsalPanel() {
  const acts = [
    {
      state: "done" as const,
      label: "Watched",
      detail: "142 past runs, 3 people, 2 systems",
    },
    {
      state: "done" as const,
      label: "Rehearsed",
      detail: "38 edge cases replayed, 4 sent back for a rule",
    },
    {
      state: "live" as const,
      label: "Performing",
      detail: "running unattended · 6 escalations this month",
    },
  ];

  return (
    <div className="mx-auto mt-16 w-full max-w-2xl sm:mt-20">
      <div className="rounded-2xl border border-stage-line bg-stage-raised/80 p-1.5 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="rounded-xl border border-stage-line/70 bg-stage p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4 border-b border-stage-line pb-4">
            <p className="u-eyebrow text-dim">Scene 03 — Supplier invoices</p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cue/15 px-2.5 py-1 text-[0.6875rem] font-medium text-cue-bright">
              <span className="u-pulse h-1.5 w-1.5 rounded-full bg-cue-bright" />
              Live
            </span>
          </div>

          <ol className="mt-5 space-y-4">
            {acts.map((act) => (
              <li key={act.label} className="flex items-start gap-3.5">
                <span
                  className={
                    act.state === "live"
                      ? "mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-spot ring-4 ring-spot/20"
                      : "mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-dim/60"
                  }
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-chalk">{act.label}</p>
                  <p className="font-mono text-xs text-dim">{act.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-dim/80">
        Illustrative. Understudy is in development — this is the shape of the product,
        not a live customer.
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="on-stage u-spotlight u-boards relative overflow-hidden bg-stage pt-20 pb-24 sm:pt-28 sm:pb-32">
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="u-eyebrow u-rise inline-flex items-center gap-2 rounded-full border border-stage-line bg-stage-raised px-3.5 py-1.5 text-spot">
            <span className="h-1.5 w-1.5 rounded-full bg-spot" />
            Pre-launch · {LAUNCH_WINDOW}
          </p>

          <h1 className="u-display u-rise mt-7 text-[clamp(2.6rem,7.5vw,4.75rem)] text-chalk">
            It learns the job.
            <br />
            Then it <span className="text-spot italic">does</span> the job.
          </h1>

          <p className="u-rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-dim">
            Understudy is an AI automation service. We shadow how your team really runs
            a workflow — the exceptions, the judgement calls, the copy-paste between
            five tabs — then put an agent on it that runs the whole thing, and show you
            every step it took.
          </p>

          <div className="u-rise mx-auto mt-9 max-w-lg" id="waitlist-hero">
            <WaitlistForm source="hero" onStage />
            <p className="mt-3 text-xs text-dim">
              Free to join. The first pilot cohort is deliberately small — we take on
              one workflow per company to start.
            </p>
          </div>
        </div>

        <RehearsalPanel />
      </Container>
    </section>
  );
}
