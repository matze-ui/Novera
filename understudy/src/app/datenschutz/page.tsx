import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL, SITE_NAME, WAITLIST_ENDPOINT, impressumMissingFields } from "@/lib/config";
import { Field, LegalPage, Section } from "@/components/legal/legal-ui";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${SITE_NAME} handles personal data.`,
  robots: { index: true, follow: false },
};

/**
 * Written from what the code actually does, not from a template. If the app
 * starts setting cookies, adding analytics or loading third-party scripts,
 * this page stops being true and must change with it.
 */
export default function DatenschutzPage() {
  const missing = impressumMissingFields();
  // The static export ships without the API route, so the forms accept nothing
  // and none of the storage described below happens on such a deployment.
  const waitlistOpen = Boolean(WAITLIST_ENDPOINT);

  return (
    <LegalPage title="Privacy" updated="22 September 2026" incomplete={missing}>
      <Section heading="In short">
        <p>
          This site sets <strong>no cookies</strong>, runs <strong>no analytics</strong>{" "}
          and loads <strong>no third-party scripts</strong>. Fonts are served from this
          domain, so your browser makes no request to Google or any other provider
          while you read the page.
        </p>
        {waitlistOpen ? (
          <p>
            The only personal data we hold is what you type into the waitlist form. If
            you never submit it, we store nothing about you beyond the short-lived
            technical records described below.
          </p>
        ) : (
          <p>
            The waitlist is not open on this site yet, so there is no form to submit and
            we hold no personal data about you at all.
          </p>
        )}
      </Section>

      <Section heading="Controller">
        <p>
          <Field value={LEGAL.name} label="legal name" />
          {LEGAL.address ? `, ${LEGAL.address}` : " "}
          {!LEGAL.address && <Field value="" label="address" />}
          {LEGAL.email && (
            <>
              {" — "}
              <a className="text-cue underline underline-offset-2" href={`mailto:${LEGAL.email}`}>
                {LEGAL.email}
              </a>
            </>
          )}
        </p>
        <p className="text-sm text-muted">
          Full details are in the <Link className="text-cue underline underline-offset-2" href="/impressum">Impressum</Link>.
        </p>
      </Section>

      <Section heading="What the waitlist stores">
        {waitlistOpen ? (
          <p>When you submit the form we record exactly these fields:</p>
        ) : (
          <p>
            Nothing yet: the forms on this site say the waitlist opens shortly and accept
            no input, so no sign-up reaches us. When it opens, these are the fields it
            will record, and this page will be updated before that happens:
          </p>
        )}
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Email address</strong> — required. Stored lowercased, and used to
            recognise a repeat submission so you don&rsquo;t get a duplicate entry.
          </li>
          <li>
            <strong>Company</strong> and <strong>what you&rsquo;d hand over first</strong> —
            both optional, and blank if you leave them blank.
          </li>
          <li>
            <strong>Which form you used</strong> and the <strong>time of submission</strong>,
            plus your position in the queue.
          </li>
        </ul>
        <p>
          <strong>Purpose:</strong> to contact you when early access opens, and to
          understand which workflows to build for first.
        </p>
        <p>
          <strong>Legal basis:</strong> your consent, Art. 6(1)(a) GDPR, given by
          submitting the form. You can withdraw it at any time with effect for the
          future.
        </p>
        <p>
          <strong>Retention:</strong> until early access opens and you have been
          contacted, or until you ask us to delete it — whichever comes first.
        </p>
      </Section>

      <Section heading="Technical data">
        {waitlistOpen && (
          <p>
            The waitlist endpoint is rate-limited to protect it from automated abuse.
            To do that, your IP address is held <strong>in memory only, for at most
            sixty seconds</strong>, and is never written to the database or associated
            with your submission. Legal basis: legitimate interest in keeping the
            service available, Art. 6(1)(f) GDPR.
          </p>
        )}
        <p>
          Our hosting provider{" "}
          {LEGAL.hostingProvider ? (
            <strong>{LEGAL.hostingProvider}</strong>
          ) : (
            <Field value="" label="hosting provider" />
          )}{" "}
          processes server logs on our behalf as a processor under Art. 28 GDPR. These
          may contain IP addresses and are kept for a short period for security and
          troubleshooting.
        </p>
        {LEGAL.dataRegion && (
          <p>
            Waitlist data is stored in <strong>{LEGAL.dataRegion}</strong>.
          </p>
        )}
      </Section>

      <Section heading="Who else sees it">
        <p>
          We do not sell your data, and we do not share it for anyone else&rsquo;s
          marketing. It is seen by us, and by the hosting and database providers that
          run this site for us under processing agreements.
        </p>
      </Section>

      <Section heading="Your rights">
        <p>
          Under the GDPR you may request access to your data (Art. 15), correction
          (Art. 16), deletion (Art. 17), restriction of processing (Art. 18), a
          portable copy (Art. 20), and you may object to processing based on
          legitimate interest (Art. 21). Where processing rests on consent, you may
          withdraw it at any time.
        </p>
        <p>
          {LEGAL.email ? (
            <>
              To exercise any of these, email{" "}
              <a className="text-cue underline underline-offset-2" href={`mailto:${LEGAL.email}`}>
                {LEGAL.email}
              </a>
              .
            </>
          ) : (
            <>
              To exercise any of these, contact us at{" "}
              <Field value="" label="email" />.
            </>
          )}
        </p>
        <p>
          You also have the right to complain to a supervisory authority. In Austria
          that is the Datenschutzbehörde,{" "}
          <a
            className="text-cue underline underline-offset-2"
            href="https://www.dsb.gv.at"
            target="_blank"
            rel="noopener noreferrer"
          >
            dsb.gv.at
          </a>
          .
        </p>
      </Section>

      <Section heading="Changes">
        <p>
          If this site starts using cookies, analytics or third-party services, this
          page will be updated before that happens — the claims above describe what
          the code does today.
        </p>
      </Section>
    </LegalPage>
  );
}
