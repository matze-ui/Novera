import { EmptyState } from "@/components/ui/states";
import { getAllLeads } from "@/lib/server/lead-store";
import { LEAD_PIPELINE_ORDER, LEAD_STATUS_LABELS, LEAD_SOURCE_LABELS } from "@/lib/leads";
import type { LeadSource } from "@/lib/types";

const SOURCES: LeadSource[] = ["match", "viewing-request", "owner-submission", "contact"];

export default async function DashboardAnalyticsPage() {
  const leads = await getAllLeads();
  const total = leads.length;

  if (total === 0) {
    return (
      <div>
        <h2 className="mb-4 text-lg font-semibold text-graphite">Analytics</h2>
        <EmptyState
          title="Nothing to show yet"
          description="Once leads start coming in, you'll see them broken down by status and source here."
        />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-graphite">Analytics</h2>
      <p className="mb-6 max-w-lg text-sm text-muted">
        Based on {total} lead{total === 1 ? "" : "s"} captured so far.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-line bg-white p-6">
          <p className="mb-1 text-sm font-semibold text-graphite">By pipeline status</p>
          {LEAD_PIPELINE_ORDER.map((status) => {
            const count = leads.filter((l) => l.status === status).length;
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

        <div className="space-y-3 rounded-2xl border border-line bg-white p-6">
          <p className="mb-1 text-sm font-semibold text-graphite">By source</p>
          {SOURCES.map((source) => {
            const count = leads.filter((l) => l.source === source).length;
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={source}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-graphite">{LEAD_SOURCE_LABELS[source]}</span>
                  <span className="text-muted">{count}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-line-soft">
                  <div
                    className="h-2 rounded-full bg-graphite"
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
    </div>
  );
}
