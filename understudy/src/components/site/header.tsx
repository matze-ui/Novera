import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

const NAV = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#what-it-runs", label: "What it runs" },
  { href: "#principles", label: "Principles" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="on-stage sticky top-0 z-50 border-b border-stage-line bg-stage">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo onStage />

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-dim transition-colors hover:text-chalk"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <ButtonLink href="#waitlist" onStage>
          Join the waitlist
        </ButtonLink>
      </Container>
    </header>
  );
}
