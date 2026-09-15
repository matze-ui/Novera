import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { BUSINESS_EMAIL, BUSINESS_PHONE, mailtoHref, telHref } from "@/lib/config";

const columns = [
  {
    heading: "Product",
    links: [
      { href: "/search", label: "Find a property" },
      { href: "/match", label: "NOVERA Match" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/premium", label: "NOVERA Premium" },
    ],
  },
  {
    heading: "For the property side",
    links: [
      { href: "/for-owners", label: "For owners" },
      { href: "/for-owners", label: "For agents" },
      { href: "/for-owners", label: "For developers" },
      { href: "/for-owners/submit", label: "Submit a property" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/cookie-settings", label: "Cookie settings" },
    ],
  },
];

export function Footer() {
  const emailHref = mailtoHref(BUSINESS_EMAIL);
  const phoneHref = telHref(BUSINESS_PHONE);

  return (
    <footer className="border-t border-line bg-white">
      <div className="novera-container py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-7 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Property demand, delivered. NOVERA connects property seekers with properties
              that fit, and helps owners, agents and developers get properties moving.
            </p>
            <div className="mt-5 space-y-1 text-sm">
              {emailHref ? (
                <a href={emailHref} className="block text-graphite hover:text-signal">
                  {BUSINESS_EMAIL}
                </a>
              ) : (
                <p className="text-muted-soft">Email — coming soon</p>
              )}
              {phoneHref ? (
                <a href={phoneHref} className="block text-graphite hover:text-signal">
                  {BUSINESS_PHONE}
                </a>
              ) : (
                <p className="text-muted-soft">Phone — coming soon</p>
              )}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-graphite">{col.heading}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link, i) => (
                  <li key={`${link.href}-${link.label}-${i}`}>
                    <Link href={link.href} className="text-sm text-muted hover:text-graphite">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted-soft sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} NOVERA. All demo content is clearly labeled.</p>
          <p>Vienna, Austria</p>
        </div>
      </div>
    </footer>
  );
}
