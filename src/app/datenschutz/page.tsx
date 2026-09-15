import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BUSINESS_EMAIL, mailtoHref } from "@/lib/config";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Privacy policy for NOVERA.",
  alternates: { canonical: "/datenschutz" },
};

const sections = [
  {
    heading: "1. Who this applies to",
    body: "NOVERA is a proptech concept in development. This page describes, honestly and at a high level, what data the current preview website processes. It is not yet a finalized privacy policy and must be reviewed by qualified legal counsel (in line with the GDPR / DSGVO) before NOVERA operates commercially.",
  },
  {
    heading: "2. What NOVERA stores today",
    body: "The site stores a small amount of data directly in your browser (localStorage), not on a server: which demo properties you've saved, any searches you've saved, and your cookie-consent choice. This data stays on your device and is never transmitted to NOVERA or a third party.",
  },
  {
    heading: "3. Forms you submit",
    body: "Viewing requests, contact messages and property submissions are sent to a demo API endpoint that holds them in server memory for testing purposes only. They are not currently persisted to a database, emailed, or shared with any third party. This will change once NOVERA connects a real backend — and this policy will be updated to describe exactly what happens to that data before that goes live.",
  },
  {
    heading: "4. Cookies and tracking",
    body: "NOVERA does not currently load any analytics, advertising or marketing scripts. See Cookie settings for the categories of storage in use and how to manage them.",
  },
  {
    heading: "5. Your rights",
    body: "Once NOVERA processes personal data as part of a live product, this section will describe your rights under the GDPR (access, correction, deletion, objection, and complaint to a supervisory authority) and how to exercise them.",
  },
  {
    heading: "6. Contact",
    body: "Questions about this policy can be sent using the contact details below once they are available.",
  },
];

export default function DatenschutzPage() {
  const emailHref = mailtoHref(BUSINESS_EMAIL);
  return (
    <div className="py-14">
      <Container className="max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-graphite">Datenschutz</h1>
          <Badge tone="warning">Draft</Badge>
        </div>
        <p className="mb-8 text-sm text-muted">
          Last reviewed: this is a living draft, kept in sync with what the site actually
          does. It is not a substitute for a lawyer-reviewed privacy policy.
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-base font-semibold text-graphite">{section.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {section.heading === "6. Contact" && emailHref ? (
                  <>
                    Questions about this policy can be sent to{" "}
                    <a href={emailHref} className="text-signal hover:text-signal-dark">
                      {BUSINESS_EMAIL}
                    </a>
                    .
                  </>
                ) : (
                  section.body
                )}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
