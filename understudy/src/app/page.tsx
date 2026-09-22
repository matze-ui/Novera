import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhatItRuns } from "@/components/sections/what-it-runs";
import { Principles } from "@/components/sections/principles";
import { EarlyAccess } from "@/components/sections/early-access";
import { Faq } from "@/components/sections/faq";
import { ClosingCta } from "@/components/sections/closing-cta";

export default function Page() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <WhatItRuns />
      <Principles />
      <EarlyAccess />
      <Faq />
      <ClosingCta />
    </>
  );
}
