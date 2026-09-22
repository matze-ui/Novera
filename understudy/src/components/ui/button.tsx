import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium " +
  "transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55";

const sizes = {
  md: "px-5 py-2.5",
  lg: "px-6 py-3.5 text-[0.9375rem]",
} as const;

/**
 * `onStage` switches the palette for dark sections. Amber-on-dark and
 * ink-on-paper are the two readable pairings; the outline variant flips
 * its border and text with the surface.
 */
function variantClasses(variant: Variant, onStage: boolean): string {
  if (variant === "primary") {
    return "bg-spot-solid text-white hover:bg-spot-deep";
  }
  if (variant === "outline") {
    return onStage
      ? "border border-stage-line text-chalk hover:border-spot hover:text-spot"
      : "border border-line text-ink hover:border-ink";
  }
  return onStage ? "text-dim hover:text-chalk" : "text-muted hover:text-ink";
}

interface CommonProps {
  variant?: Variant;
  size?: keyof typeof sizes;
  onStage?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  onStage = false,
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, sizes[size], variantClasses(variant, onStage), className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  onStage = false,
  className,
  children,
  href,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >) {
  return (
    <Link
      href={href}
      className={cn(base, sizes[size], variantClasses(variant, onStage), className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
