import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";

export const metadata: Metadata = {
  title: "Owner dashboard",
  robots: { index: false, follow: false },
};

// Leads are read from a local file on every request — never cache this section.
export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <h1 className="mb-2 text-2xl font-semibold text-graphite sm:text-3xl">Owner dashboard</h1>
        <p className="mb-8 max-w-xl text-sm text-muted">
          Every lead below came from the live site — NOVERA Match requests, viewing
          requests, property submissions and contact messages.
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          <DashboardNav />
          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
}
