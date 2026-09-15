import { LeadCard } from "@/components/dashboard/lead-card";
import { EmptyState } from "@/components/ui/states";
import { getAllLeads } from "@/lib/server/lead-store";
import { LEAD_PIPELINE_ORDER, LEAD_STATUS_LABELS } from "@/lib/leads";

export default async function DashboardLeadsPage() {
  const leads = await getAllLeads();

  if (leads.length === 0) {
    return (
      <div>
        <h2 className="mb-4 text-lg font-semibold text-graphite">Lead pipeline</h2>
        <EmptyState
          title="No leads yet"
          description="Every NOVERA Match request, viewing request, property submission and contact message lands here automatically."
        />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-graphite">Lead pipeline</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {LEAD_PIPELINE_ORDER.map((status) => {
          const leadsForStatus = leads.filter((l) => l.status === status);
          return (
            <div key={status} className="w-72 shrink-0">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-graphite">{LEAD_STATUS_LABELS[status]}</p>
                <span className="rounded-full bg-line-soft px-2 py-0.5 text-xs text-muted">
                  {leadsForStatus.length}
                </span>
              </div>
              <div className="space-y-3">
                {leadsForStatus.map((lead) => (
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
