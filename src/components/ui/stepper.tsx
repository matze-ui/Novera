import { cn } from "@/lib/utils";

export function Stepper({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <ol className="flex items-center gap-2 overflow-x-auto no-scrollbar" aria-label="Progress">
      {steps.map((step, i) => {
        const state = i < currentStep ? "done" : i === currentStep ? "current" : "upcoming";
        return (
          <li key={step} className="flex items-center gap-2 shrink-0">
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                state === "done" && "bg-signal text-white",
                state === "current" && "border-2 border-signal text-signal",
                state === "upcoming" && "border border-line text-muted-soft",
              )}
              aria-current={state === "current" ? "step" : undefined}
            >
              {state === "done" ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path
                    d="M1.5 5.2 3.7 7.5 8.5 2.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <span
              className={cn(
                "text-xs font-medium",
                state === "upcoming" ? "text-muted-soft" : "text-graphite",
              )}
            >
              {step}
            </span>
            {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-line" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
