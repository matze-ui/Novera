import { Badge } from "@/components/ui/badge";
import { demoLeads, LEAD_STATUS_LABELS } from "@/lib/demo-leads";
import { formatDate } from "@/lib/utils";

export default function DashboardViewingRequestsPage() {
  const viewingLeads = demoLeads.filter((l) =>
    ["viewing-requested", "viewing-booked", "viewing-completed"].includes(l.status),
  );

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-graphite">Viewing requests</h2>
      {viewingLeads.length === 0 ? (
        <p className="text-sm text-muted">No viewing requests yet.</p>
      ) : (
        <ul className="space-y-3">
          {viewingLeads.map((lead) => (
            <li
              key={lead.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-white px-5 py-4"
            >
              <div>
                <p className="font-medium text-graphite">{lead.name}</p>
                <p className="text-sm text-muted">{lead.propertyTitle}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-soft">
                  Last contact {lead.lastContact ? formatDate(lead.lastContact) : "—"}
                </span>
                <Badge tone="blue">{LEAD_STATUS_LABELS[lead.status]}</Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
