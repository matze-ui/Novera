import { Badge } from "@/components/ui/badge";
import { BUSINESS_EMAIL, BUSINESS_PHONE } from "@/lib/config";

function StatusRow({
  label,
  configured,
  detail,
}: {
  label: string;
  configured: boolean;
  detail: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line py-4 last:border-0">
      <div>
        <p className="text-sm font-medium text-graphite">{label}</p>
        <p className="mt-1 text-xs text-muted">{detail}</p>
      </div>
      <Badge tone={configured ? "success" : "warning"}>{configured ? "Configured" : "Not set"}</Badge>
    </div>
  );
}

export default function DashboardSettingsPage() {
  const dashboardProtected = Boolean(process.env.DASHBOARD_USERNAME && process.env.DASHBOARD_PASSWORD);

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-graphite">Settings</h2>
      <p className="mb-6 max-w-lg text-sm text-muted">
        NOVERA doesn&rsquo;t have account or billing settings yet — this page tracks the
        configuration that actually matters right now.
      </p>
      <div className="max-w-lg rounded-2xl border border-line bg-white px-6">
        <StatusRow
          label="Dashboard access protection"
          configured={dashboardProtected}
          detail={
            dashboardProtected
              ? "This dashboard requires a username and password to view."
              : "Anyone with the URL can currently see captured leads. Set DASHBOARD_USERNAME and DASHBOARD_PASSWORD before sharing this link or sending real traffic to the site."
          }
        />
        <StatusRow
          label="Business email"
          configured={Boolean(BUSINESS_EMAIL)}
          detail={
            BUSINESS_EMAIL
              ? `Shown in the footer and Impressum as ${BUSINESS_EMAIL}.`
              : "Set NEXT_PUBLIC_BUSINESS_EMAIL to show a direct email address instead of the contact form."
          }
        />
        <StatusRow
          label="Business phone"
          configured={Boolean(BUSINESS_PHONE)}
          detail={
            BUSINESS_PHONE
              ? `Shown in the footer as ${BUSINESS_PHONE}.`
              : "Set NEXT_PUBLIC_BUSINESS_PHONE to show a direct phone number."
          }
        />
      </div>
    </div>
  );
}
