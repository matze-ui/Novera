import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Renders a configured value, or an obvious gap when it is missing.
 *
 * Deliberately loud: on a legal page an invented placeholder that reads like
 * real company data is worse than a blank that is plainly a blank.
 */
export function Field({ value, label }: { value: string; label: string }) {
  if (value) return <>{value}</>;
  return (
    <span className="rounded bg-spot-tint px-1.5 py-0.5 font-mono text-[0.8em] text-spot-ink">
      [{label} — not configured]
    </span>
  );
}

export function LegalPage({
  title,
  updated,
  incomplete,
  children,
}: {
  title: string;
  updated: string;
  incomplete?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="bg-paper py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="u-display text-[clamp(2rem,5vw,3rem)] text-ink">{title}</h1>
          <p className="mt-3 font-mono text-xs text-muted">Last updated: {updated}</p>

          {incomplete && incomplete.length > 0 && (
            <div
              role="alert"
              className="mt-8 rounded-xl border border-spot-deep/30 bg-spot-tint p-5"
            >
              <p className="text-sm font-semibold text-spot-ink">
                This page is not complete yet.
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                Missing: <span className="font-mono">{incomplete.join(", ")}</span>. An
                Austrian site offering a commercial service needs these before it takes
                real traffic. Set the matching{" "}
                <span className="font-mono">NEXT_PUBLIC_LEGAL_*</span> environment
                variables.
              </p>
            </div>
          )}

          <div className="mt-10 space-y-8">{children}</div>
        </div>
      </Container>
    </div>
  );
}

export function Section({
  heading,
  children,
  className,
}: {
  heading: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-t border-line pt-6", className)}>
      <h2 className="text-lg font-semibold tracking-[-0.01em] text-ink">{heading}</h2>
      <div className="mt-3 space-y-3 text-[0.9375rem] leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}

export function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <dt className="w-52 shrink-0 text-sm text-muted">{label}</dt>
      <dd className="text-[0.9375rem] text-ink">{value}</dd>
    </div>
  );
}
