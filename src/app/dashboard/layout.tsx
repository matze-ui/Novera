import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Owner dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-graphite sm:text-3xl">Owner dashboard</h1>
          <Badge tone="warning">Demo data</Badge>
        </div>
        <p className="mb-8 max-w-xl text-sm text-muted">
          A preview of the dashboard owners, agents and developers will use. Properties,
          leads and metrics below are illustrative — connect a real backend to make this
          live.
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          <DashboardNav />
          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
}
