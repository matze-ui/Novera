import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The mark is two offset rounded squares: an outlined one standing behind,
 * and a solid amber one that has stepped forward into the light. The
 * understudy taking the part.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={cn("h-7 w-7", className)}
    >
      <rect
        x="3.1"
        y="3.1"
        width="16"
        height="16"
        rx="4.4"
        stroke="currentColor"
        strokeWidth="2.2"
        opacity="0.42"
      />
      <rect x="8.9" y="8.9" width="16" height="16" rx="4.4" fill="var(--color-spot)" />
    </svg>
  );
}

export function Logo({
  onStage = false,
  className,
}: {
  onStage?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md",
        onStage ? "text-chalk" : "text-ink",
        className,
      )}
    >
      <LogoMark />
      <span className="text-[1.0625rem] font-semibold tracking-[-0.02em]">
        Understudy
      </span>
    </Link>
  );
}
