import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const WORKFLOWS = [
  {
    title: "Invoice and PO reconciliation",
    body: "Match supplier invoices to purchase orders and receipts, post the clean ones, chase the mismatches with the right person.",
  },
  {
    title: "Lead qualification and CRM hygiene",
    body: "Research inbound leads, score them against your actual criteria, fill in the fields your reps never fill in, route to the right owner.",
  },
  {
    title: "Support triage and first drafts",
    body: "Read the ticket, pull the account history, tag and prioritise it, and draft the reply your team would have written.",
  },
  {
    title: "Onboarding and offboarding",
    body: "Run the joiner/leaver checklist across every system, chase the approvals, and prove afterwards that each step actually happened.",
  },
  {
    title: "Recurring report assembly",
    body: "Pull the same numbers from the same six places on the same day each month, reconcile them, flag what moved and why.",
  },
  {
    title: "Migration and cleanup",
    body: "Move records between tools, resolve the duplicates and the near-misses by judgement rather than by exact match, log every call.",
  },
];

export function WhatItRuns() {
  return (
    <section id="what-it-runs" className="bg-paper-sunk py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What it runs"
          title="Repetitive work that still needs judgement"
          lede="If a workflow were purely mechanical you'd have scripted it years ago. The ones worth handing to Understudy are the ones with exceptions — where the rules are real but nobody ever finished writing them down."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WORKFLOWS.map((workflow) => (
            <div
              key={workflow.title}
              className="group rounded-2xl border border-line bg-paper-raised p-6 transition-colors hover:border-spot-deep/40"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-spot-tint">
                <span className="h-2 w-2 rounded-full bg-spot-deep" />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-[-0.01em] text-ink">
                {workflow.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{workflow.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-line bg-paper p-6 sm:p-7">
          <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">Not on the list?</span> These are
            the shapes we&rsquo;re building for first, not a catalogue. If your workflow
            is high-volume, rule-shaped and full of exceptions, it probably fits — tell
            us about it when you join and we&rsquo;ll say honestly whether it does.
          </p>
        </div>
      </Container>
    </section>
  );
}
