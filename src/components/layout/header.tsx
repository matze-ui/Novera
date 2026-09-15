"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { ContactNoveraButton } from "@/components/layout/contact-novera-button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/search", label: "Find a property" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-owners", label: "For owners" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-sm">
      <div className="novera-container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="NOVERA home">
          <Logo className="h-7 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-graphite/80 transition-colors hover:text-graphite",
                pathname === item.href && "text-graphite",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <ContactNoveraButton />
          <Link
            href="/account"
            className="text-sm font-medium text-graphite/80 hover:text-graphite"
          >
            Sign in
          </Link>
          <Button href="/for-owners/submit" size="sm">
            Get your property moving
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path
                d="M1 3H17M1 9H17M1 15H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-white md:hidden">
          <div className="novera-container flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-graphite hover:bg-line-soft"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/account"
              className="rounded-lg px-3 py-3 text-base font-medium text-graphite hover:bg-line-soft"
            >
              Sign in
            </Link>
            <ContactNoveraButton className="rounded-lg px-3 py-3 text-left text-base font-medium text-graphite hover:bg-line-soft" />
            <Button href="/for-owners/submit" className="mt-2 justify-center">
              Get your property moving
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
