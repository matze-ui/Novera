import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SubmissionWizard } from "@/components/owners/submission-wizard";

export const metadata: Metadata = {
  title: "Submit a property",
  description: "Submit a property to NOVERA in five guided steps.",
  alternates: { canonical: "/for-owners/submit" },
  robots: { index: false, follow: true },
};

export default function SubmitPropertyPage() {
  return (
    <div className="py-10 sm:py-14">
      <Container className="max-w-3xl">
        <h1 className="text-2xl font-semibold text-graphite sm:text-3xl">
          Get your property moving
        </h1>
        <p className="mt-2 text-muted">
          Five short steps. You can go back and change anything before you submit.
        </p>
        <div className="mt-10">
          <SubmissionWizard />
        </div>
      </Container>
    </div>
  );
}
