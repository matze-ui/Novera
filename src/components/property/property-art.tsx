import type { ArtVariant, PropertyImage } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Abstract, generated architectural line-art used in place of real
 * photography for DEMO listings. No stock photography or real building
 * imagery is used anywhere in this codebase — every visual here is a
 * simple vector illustration, generated at render time.
 */

const gradients: Record<PropertyImage["tone"], { from: string; to: string; line: string }> = {
  blue: { from: "#1c2a52", to: "#4169ff", line: "#dbe4ff" },
  graphite: { from: "#111318", to: "#3a3f4c", line: "#e4e6eb" },
  warm: { from: "#2b2620", to: "#8a6a3f", line: "#f3e6cf" },
};

function VariantShapes({ variant, line }: { variant: ArtVariant; line: string }) {
  const stroke = { stroke: line, strokeWidth: 1.2, fill: "none" } as const;
  switch (variant) {
    case "riverside":
      return (
        <g opacity={0.85}>
          <path d="M0 220 L400 220" {...stroke} />
          <path d="M40 220 L40 120 L110 120 L110 220" {...stroke} />
          <path d="M130 220 L130 90 L220 90 L220 220" {...stroke} />
          <path d="M240 220 L240 140 L310 140 L310 220" {...stroke} />
          {Array.from({ length: 4 }).map((_, i) => (
            <rect key={i} x={55 + i * 15} y={140} width={8} height={10} {...stroke} />
          ))}
        </g>
      );
    case "grid":
      return (
        <g opacity={0.85}>
          <rect x={70} y={60} width={260} height={170} {...stroke} />
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={82 + c * 41} y={72 + r * 30} width={26} height={20} {...stroke} />
            )),
          )}
        </g>
      );
    case "arch":
      return (
        <g opacity={0.85}>
          <path d="M60 230 L60 130 A40 40 0 0 1 140 130 L140 230" {...stroke} />
          <path d="M170 230 L170 130 A40 40 0 0 1 250 130 L250 230" {...stroke} />
          <path d="M280 230 L280 130 A40 40 0 0 1 360 130 L360 230" {...stroke} />
          <path d="M20 230 L380 230" {...stroke} />
        </g>
      );
    case "terrace":
      return (
        <g opacity={0.85}>
          <path d="M40 200 L360 200" {...stroke} />
          {Array.from({ length: 18 }).map((_, i) => (
            <path key={i} d={`M${50 + i * 18} 200 L${50 + i * 18} 160`} {...stroke} />
          ))}
          <path d="M40 160 L360 160" {...stroke} />
          <path d="M90 160 L90 70 L310 70 L310 160" {...stroke} />
        </g>
      );
    case "tower":
      return (
        <g opacity={0.85}>
          <path d="M140 230 L140 40 L260 40 L260 230" {...stroke} />
          {Array.from({ length: 6 }).map((_, r) => (
            <path key={r} d={`M140 ${60 + r * 28} L260 ${60 + r * 28}`} {...stroke} />
          ))}
          <path d="M20 230 L140 230 M260 230 L380 230" {...stroke} />
        </g>
      );
    case "courtyard":
      return (
        <g opacity={0.85}>
          <rect x={60} y={50} width={280} height={180} {...stroke} />
          <rect x={140} y={110} width={120} height={90} {...stroke} />
          <path d="M60 50 L140 110 M340 50 L260 110 M60 230 L140 200 M340 230 L260 200" {...stroke} />
        </g>
      );
  }
}

export function PropertyArt({
  image,
  className,
}: {
  image: PropertyImage;
  className?: string;
  /** Accepted for API symmetry with next/image; this SVG has no loading priority to set. */
  priority?: boolean;
}) {
  const palette = gradients[image.tone];
  const gradientId = `novera-art-${image.variant}-${image.tone}`;

  return (
    <svg
      viewBox="0 0 400 280"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={image.alt}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill={`url(#${gradientId})`} />
      <VariantShapes variant={image.variant} line={palette.line} />
    </svg>
  );
}
