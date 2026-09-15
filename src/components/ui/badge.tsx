import { cn } from "@/lib/utils";

type BadgeTone = "blue" | "graphite" | "success" | "warning" | "neutral" | "outline";

const tones: Record<BadgeTone, string> = {
  blue: "bg-signal-tint text-signal-dark",
  graphite: "bg-graphite text-white",
  success: "bg-success-tint text-success",
  warning: "bg-warning-tint text-warning",
  neutral: "bg-line-soft text-muted",
  outline: "border border-line text-graphite",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function MatchBadge({ score, className }: { score: number; className?: string }) {
  return (
    <Badge tone="blue" className={className}>
      {Math.round(score)}% match
    </Badge>
  );
}
