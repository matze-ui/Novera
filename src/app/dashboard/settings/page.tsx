import { Badge } from "@/components/ui/badge";

export default function DashboardSettingsPage() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-graphite">Settings</h2>
        <Badge tone="warning">Not yet functional</Badge>
      </div>
      <p className="mb-6 max-w-lg text-sm text-muted">
        Account, notification and billing settings will live here once authentication and a
        real backend are connected.
      </p>
      <div className="max-w-md space-y-4 rounded-2xl border border-line bg-white p-6">
        {["Company name", "Contact email", "Notification preferences"].map((label) => (
          <label key={label} className="block">
            <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
            <input
              disabled
              className="w-full rounded-xl border border-line bg-line-soft px-3 py-2.5 text-sm text-muted-soft"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
