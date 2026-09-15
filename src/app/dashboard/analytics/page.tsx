import { Badge } from "@/components/ui/badge";
import { LEAD_PIPELINE_ORDER, LEAD_STATUS_LABELS, demoLeads } from "@/lib/demo-leads";

export default function DashboardAnalyticsPage() {
  const total = demoLeads.length;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-graphite">Analytics</h2>
        <Badge tone="warning">Example data</Badge>
      </div>
      <p className="mb-6 max-w-lg text-sm text-muted">
        A real analytics view will track reach, interest and conversion over time once
        properties, leads and viewings are backed by a database. Below is the shape of that
        view using today&rsquo;s demo leads.
      </p>

      <div className="space-y-3 rounded-2xl border border-line bg-white p-6">
        {LEAD_PIPELINE_ORDER.map((status) => {
          const count = demoLeads.filter((l) => l.status === status).length;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={status}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-graphite">{LEAD_STATUS_LABELS[status]}</span>
                <span className="text-muted">{count}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-line-soft">
                <div
                  className="h-2 rounded-full bg-signal"
                  style={{ width: `${pct}%` }}
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
