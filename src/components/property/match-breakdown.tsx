import type { MatchBreakdownItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MatchBreakdown({
  score,
  breakdown,
}: {
  score: number;
  breakdown: MatchBreakdownItem[];
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-graphite">Why this matches</h3>
        <span className="text-2xl font-semibold text-signal">{Math.round(score)}%</span>
      </div>
      <p className="mt-1 text-xs text-muted">
        An internal relevance score based on your preferences — not a guarantee of fit or
        availability.
      </p>
      <ul className="mt-5 space-y-3">
        {breakdown.map((item) => (
          <li key={item.key} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white",
                item.met ? "bg-success" : "bg-line",
              )}
              aria-hidden="true"
            >
              {item.met ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1.5 5.2 3.7 7.5 8.5 2.5"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 1 7 7M7 1 1 7" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              )}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-graphite">{item.label}</span>
                <span className="text-xs text-muted-soft">{item.weight}% weight</span>
              </div>
              <p className="text-sm text-muted">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
