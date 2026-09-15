import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AccountNav } from "@/components/account/account-nav";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-graphite sm:text-3xl">Your account</h1>
          <Badge tone="warning">Demo foundation</Badge>
        </div>
        <p className="mb-8 max-w-xl text-sm text-muted">
          There&rsquo;s no real sign-in yet — this preview uses your browser&rsquo;s local
          storage to remember saved properties and searches on this device only.
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          <AccountNav />
          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
}
