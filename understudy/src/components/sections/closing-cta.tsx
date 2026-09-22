import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

export function ClosingCta() {
  return (
    <section
      id="waitlist"
      className="on-stage u-spotlight relative overflow-hidden bg-stage py-24 sm:py-32"
    >
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="u-eyebrow text-spot">Join the waitlist</p>
          <h2 className="u-display mt-4 text-[clamp(2rem,5vw,3.4rem)] text-chalk">
            Tell us what you&rsquo;d hand over first.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-dim sm:text-lg">
            Email is all we need. The other two fields just help us work out which
            workflows to build for first — and whether yours is one we can genuinely
            help with.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-stage-line bg-stage-raised/70 p-6 backdrop-blur sm:p-8">
          <WaitlistForm source="closing" variant="full" onStage />
          <p className="mt-4 text-xs leading-relaxed text-dim">
            We&rsquo;ll only email you about Understudy, and you can unsubscribe from
            any message. No payment details, nothing to cancel.
          </p>
        </div>
      </Container>
    </section>
  );
}
