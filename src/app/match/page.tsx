import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { MatchWizard } from "@/components/match/match-wizard";

export const metadata: Metadata = {
  title: "NOVERA Match — Stop searching, start matching",
  description:
    "Tell NOVERA what you're looking for and see a transparent, weighted match score against available demo properties in Vienna.",
  alternates: { canonical: "/match" },
};

export default function MatchPage() {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-signal">
            NOVERA Match
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-graphite sm:text-4xl">
            Stop searching. Start matching.
          </h1>
          <p className="mt-4 text-base text-muted">
            Answer a few questions and we&rsquo;ll score every active demo property against
            your preferences — with a transparent breakdown of exactly why each one matched.
          </p>
        </div>
        <MatchWizard />
      </Container>
    </div>
  );
}
