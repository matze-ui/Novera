import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/site/logo";
import { CONTACT_EMAIL, COMPANY_LEGAL_NAME, SITE_NAME } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-stage border-t border-stage-line bg-stage py-14">
      <Container>
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 text-chalk">
              <LogoMark />
              <span className="text-[1.0625rem] font-semibold tracking-[-0.02em]">
                {SITE_NAME}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-dim">
              AI automations that learn your team&rsquo;s process by watching it, then
              run it end to end — with the receipts.
            </p>
          </div>

          <nav aria-label="Footer" className="flex gap-14">
            <div>
              <h2 className="u-eyebrow text-dim">Product</h2>
              <ul className="mt-3.5 space-y-2.5 text-sm">
                <li>
                  <a href="#how-it-works" className="text-chalk/80 hover:text-spot">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#what-it-runs" className="text-chalk/80 hover:text-spot">
                    What it runs
                  </a>
                </li>
                <li>
                  <a href="#principles" className="text-chalk/80 hover:text-spot">
                    Principles
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-chalk/80 hover:text-spot">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="u-eyebrow text-dim">Get in touch</h2>
              <ul className="mt-3.5 space-y-2.5 text-sm">
                <li>
                  <a href="#waitlist" className="text-chalk/80 hover:text-spot">
                    Join the waitlist
                  </a>
                </li>
                <li>
                  {/*
                    No public inbox exists yet. Rather than ship a mailto: that
                    bounces, point people at the form until the address is real.
                  */}
                  {CONTACT_EMAIL ? (
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-chalk/80 hover:text-spot"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  ) : (
                    <span className="text-dim">Email — coming with launch</span>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-stage-line pt-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {COMPANY_LEGAL_NAME || SITE_NAME}.
          </p>
          <p>
            Pre-launch. Nothing on this page is available to buy yet — the waitlist is
            how you get first access.
          </p>
        </div>
      </Container>
    </footer>
  );
}
