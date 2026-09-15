import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_ADDRESS, mailtoHref, telHref } from "@/lib/config";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Legal notice for NOVERA.",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <div className="py-14">
      <Container className="max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-graphite">Impressum</h1>
          <Badge tone="warning">Draft — pending registration</Badge>
        </div>

        <p className="mb-8 text-sm leading-relaxed text-muted">
          NOVERA is currently a concept in development and has not yet been registered as a
          legal entity in Austria. The information below is a placeholder structure for the
          legal notice required under Austrian law (§ 5 ECG / § 25 Mediengesetz) and must be
          completed with accurate, verified details once a legal entity exists.
        </p>

        <dl className="space-y-5 text-sm">
          <Field label="Company name / legal form">
            [To be added once the company is registered]
          </Field>
          <Field label="Commercial register number (FN)">
            [To be added once the company is registered]
          </Field>
          <Field label="VAT / UID number">[To be added once the company is registered]</Field>
          <Field label="Registered address">
            {BUSINESS_ADDRESS ?? "[To be added once the company is registered]"}
          </Field>
          <Field label="Managing director / responsible person">
            [To be added once the company is registered]
          </Field>
          <Field label="Email">
            {mailtoHref(BUSINESS_EMAIL) ? (
              <a href={mailtoHref(BUSINESS_EMAIL)!} className="text-signal hover:text-signal-dark">
                {BUSINESS_EMAIL}
              </a>
            ) : (
              "[To be added]"
            )}
          </Field>
          <Field label="Phone">
            {telHref(BUSINESS_PHONE) ? (
              <a href={telHref(BUSINESS_PHONE)!} className="text-signal hover:text-signal-dark">
                {BUSINESS_PHONE}
              </a>
            ) : (
              "[To be added]"
            )}
          </Field>
          <Field label="Regulatory authority">[To be added, if applicable]</Field>
          <Field label="Dispute resolution (EU ODR)">
            [To be added once the company is registered — a link to the EU Online Dispute
            Resolution platform will go here if applicable]
          </Field>
        </dl>

        <p className="mt-10 text-xs text-muted-soft">
          This page must be reviewed and finalized by qualified legal counsel before NOVERA
          operates commercially in Austria.
        </p>
      </Container>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line pb-4">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-soft">{label}</dt>
      <dd className="mt-1 text-graphite">{children}</dd>
    </div>
  );
}
