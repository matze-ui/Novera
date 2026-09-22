import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import {
  BUSINESS_ADDRESS,
  BUSINESS_AUTHORITY,
  BUSINESS_CHAMBER,
  BUSINESS_EMAIL,
  BUSINESS_LEGAL_NAME,
  BUSINESS_PHONE,
  BUSINESS_REGISTER,
  BUSINESS_REPRESENTATIVE,
  BUSINESS_VAT_ID,
  LEGAL_NOTICE_IS_COMPLETE,
  mailtoHref,
  telHref,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Legal notice for NOVERA.",
  alternates: { canonical: "/impressum" },
};

const MISSING = "[To be added]";

export default function ImpressumPage() {
  const emailHref = mailtoHref(BUSINESS_EMAIL);
  const phoneHref = telHref(BUSINESS_PHONE);

  return (
    <div className="py-14">
      <Container className="max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-graphite">Impressum</h1>
          {!LEGAL_NOTICE_IS_COMPLETE && <Badge tone="warning">Draft — pending registration</Badge>}
        </div>

        {!LEGAL_NOTICE_IS_COMPLETE && (
          <p className="mb-8 text-sm leading-relaxed text-muted">
            NOVERA has not yet been registered as a legal entity in Austria. The information
            below is a placeholder structure for the legal notice required under Austrian law
            (§ 5 ECG / § 25 Mediengesetz) and must be completed with accurate, verified
            details once a legal entity exists.
          </p>
        )}

        <p className="mb-8 text-sm leading-relaxed text-muted">
          Information required under § 5 ECG and § 25 Mediengesetz.
        </p>

        <dl className="space-y-5 text-sm">
          <Field label="Company name / legal form">{BUSINESS_LEGAL_NAME ?? MISSING}</Field>
          {BUSINESS_REGISTER && (
            <Field label="Commercial register">{BUSINESS_REGISTER}</Field>
          )}
          {BUSINESS_VAT_ID && <Field label="VAT / UID number">{BUSINESS_VAT_ID}</Field>}
          <Field label="Registered address">{BUSINESS_ADDRESS ?? MISSING}</Field>
          <Field label="Managing director / responsible person">
            {BUSINESS_REPRESENTATIVE ?? MISSING}
          </Field>
          <Field label="Email">
            {emailHref ? (
              <a href={emailHref} className="text-signal hover:text-signal-dark">
                {BUSINESS_EMAIL}
              </a>
            ) : (
              MISSING
            )}
          </Field>
          {phoneHref && (
            <Field label="Phone">
              <a href={phoneHref} className="text-signal hover:text-signal-dark">
                {BUSINESS_PHONE}
              </a>
            </Field>
          )}
          {BUSINESS_CHAMBER && <Field label="Chamber membership">{BUSINESS_CHAMBER}</Field>}
          {BUSINESS_AUTHORITY && <Field label="Regulatory authority">{BUSINESS_AUTHORITY}</Field>}
          <Field label="Business purpose">
            An online platform that connects property seekers with properties that fit, and
            helps owners, agents and developers reach them.
          </Field>
        </dl>

        {!LEGAL_NOTICE_IS_COMPLETE && (
          <p className="mt-10 text-xs text-muted-soft">
            This page must be reviewed and finalized by qualified legal counsel before NOVERA
            operates commercially in Austria.
          </p>
        )}
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
