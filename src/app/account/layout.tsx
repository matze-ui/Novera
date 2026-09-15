import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AccountNav } from "@/components/account/account-nav";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <h1 className="mb-2 text-2xl font-semibold text-graphite sm:text-3xl">Your account</h1>
        <p className="mb-8 max-w-xl text-sm text-muted">
          There&rsquo;s no sign-in yet, so saved properties and searches are remembered on
          this device only, in this browser.
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          <AccountNav />
          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
}
