import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  onStage = false,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  onStage?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      <p className={cn("u-eyebrow", onStage ? "text-spot" : "text-spot-ink")}>
        {eyebrow}
      </p>
      <h2
        className={cn(
          "u-display mt-4 text-[clamp(1.9rem,4.2vw,3rem)]",
          onStage ? "text-chalk" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            onStage ? "text-dim" : "text-muted",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
