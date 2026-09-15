import { cn } from "@/lib/utils";

/** NOVERA wordmark with the geometric "N" symbol, inline SVG. */
export function Logo({ className, mark = "auto" }: { className?: string; mark?: "auto" | "light" | "dark" }) {
  const wordmarkColor = mark === "light" ? "#ffffff" : "#111318";
  return (
    <svg
      viewBox="0 0 168 28"
      className={cn("text-graphite", className)}
      role="img"
      aria-label="NOVERA"
    >
      <defs>
        <linearGradient id="novera-n-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6f93ff" />
          <stop offset="100%" stopColor="#1f3fd6" />
        </linearGradient>
      </defs>
      <g transform="translate(0,2)">
        <path d="M2 22V6a2 2 0 0 1 2-2h1.2L18 18V4h4v20a2 2 0 0 1-2 2h-1.2L5 12v12H1" fill="url(#novera-n-gradient)" />
      </g>
      <text
        x="34"
        y="20"
        fontFamily="var(--font-inter), Inter, sans-serif"
        fontSize="17"
        fontWeight="700"
        letterSpacing="0.5"
        fill={wordmarkColor}
      >
        NOVERA
      </text>
    </svg>
  );
}
