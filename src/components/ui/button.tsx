import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "sm" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-signal text-white hover:bg-signal-dark",
  secondary: "bg-graphite text-white hover:bg-graphite-soft",
  ghost: "bg-transparent text-graphite border border-line hover:border-graphite",
  danger: "bg-transparent text-red-600 border border-red-200 hover:bg-red-50",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-3",
  lg: "text-base px-6 py-3.5",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className, ...props }, ref) {
    const classes = cn(base, variants[variant], sizes[size], className);

    if ("href" in props && props.href) {
      const { href, ...rest } = props;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  },
);
