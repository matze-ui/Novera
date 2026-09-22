import type { Metadata } from "next";
import { LEGAL, SITE_NAME, impressumMissingFields } from "@/lib/config";
import { Field, LegalPage, Row, Section } from "@/components/legal/legal-ui";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Legal disclosure for ${SITE_NAME}.`,
  robots: { index: true, follow: false },
};

export default function ImpressumPage() {
  const missing = impressumMissingFields();

  return (
    <LegalPage title="Impressum" updated="22 September 2026" incomplete={missing}>
      <Section heading="Information under § 5 ECG and § 25 MedienG">
        <dl className="space-y-2">
          <Row label="Media owner / operator" value={<Field value={LEGAL.name} label="legal name" />} />
          <Row label="Address" value={<Field value={LEGAL.address} label="address" />} />
          <Row
            label="Email"
            value={
              LEGAL.email ? (
                <a className="text-cue underline underline-offset-2" href={`mailto:${LEGAL.email}`}>
                  {LEGAL.email}
                </a>
              ) : (
                <Field value="" label="email" />
              )
            }
          />
          {LEGAL.phone && <Row label="Phone" value={LEGAL.phone} />}
          {LEGAL.representative && <Row label="Represented by" value={LEGAL.representative} />}
          {LEGAL.vatId && <Row label="VAT ID" value={LEGAL.vatId} />}
          {LEGAL.registerNumber && <Row label="Company register no." value={LEGAL.registerNumber} />}
          {LEGAL.registerCourt && <Row label="Register court" value={LEGAL.registerCourt} />}
          {LEGAL.chamber && <Row label="Chamber membership" value={LEGAL.chamber} />}
          {LEGAL.authority && <Row label="Supervisory authority" value={LEGAL.authority} />}
        </dl>
        <p className="text-sm text-muted">
          Fields that do not apply to this business — a VAT ID before VAT registration,
          or register details for a business not entered in the Firmenbuch — are
          omitted rather than left blank.
        </p>
      </Section>

      <Section heading="Purpose of this site">
        <p>
          {SITE_NAME} is pre-launch. This site describes a planned AI automation
          service and collects sign-ups for early access. Nothing on it is available
          to buy, and no payment details are collected.
        </p>
      </Section>

      <Section heading="Online dispute resolution">
        <p>
          The European Commission provides a platform for online dispute resolution at{" "}
          <a
            className="text-cue underline underline-offset-2"
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ec.europa.eu/consumers/odr
          </a>
          . We are neither obliged nor willing to take part in dispute resolution
          proceedings before a consumer arbitration board.
        </p>
      </Section>

      <Section heading="Liability for links">
        <p>
          This site links to external sites whose content is outside our control. No
          unlawful content was apparent at the time of linking. Responsibility for
          linked content rests with its provider.
        </p>
      </Section>
    </LegalPage>
  );
}
