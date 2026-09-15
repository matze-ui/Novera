"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/account", label: "My matches" },
  { href: "/account/saved", label: "Saved properties" },
  { href: "/account/searches", label: "Saved searches" },
  { href: "/account/viewings", label: "Viewing requests" },
  { href: "/account/profile", label: "Profile" },
];

export function AccountNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Account" className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-graphite text-white"
              : "text-graphite hover:bg-line-soft",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
