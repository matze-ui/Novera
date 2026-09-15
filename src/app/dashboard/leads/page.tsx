import { LeadCard } from "@/components/dashboard/lead-card";
import { demoLeads, LEAD_PIPELINE_ORDER, LEAD_STATUS_LABELS } from "@/lib/demo-leads";

export default function DashboardLeadsPage() {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-graphite">Lead pipeline</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {LEAD_PIPELINE_ORDER.map((status) => {
          const leads = demoLeads.filter((l) => l.status === status);
          return (
            <div key={status} className="w-64 shrink-0">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-graphite">{LEAD_STATUS_LABELS[status]}</p>
                <span className="rounded-full bg-line-soft px-2 py-0.5 text-xs text-muted">
                  {leads.length}
                </span>
              </div>
              <div className="space-y-3">
                {leads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
