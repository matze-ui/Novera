"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/properties", label: "Properties" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/viewing-requests", label: "Viewing requests" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col">
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
