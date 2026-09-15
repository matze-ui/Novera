import { EmptyState } from "@/components/ui/states";
import { LeadStatusSelect } from "@/components/dashboard/lead-status-select";
import { getAllLeads } from "@/lib/server/lead-store";
import { formatDate } from "@/lib/utils";

export default async function DashboardViewingRequestsPage() {
  const leads = await getAllLeads();
  const viewingRequests = leads.filter((l) => l.source === "viewing-request");

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-graphite">Viewing requests</h2>
      {viewingRequests.length === 0 ? (
        <EmptyState
          title="No viewing requests yet"
          description="When someone requests a viewing from a property page, it will appear here."
        />
      ) : (
        <ul className="space-y-3">
          {viewingRequests.map((lead) => (
            <li
              key={lead.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-white px-5 py-4"
            >
              <div>
                <p className="font-medium text-graphite">{lead.name}</p>
                <p className="text-sm text-muted">{lead.propertyTitle}</p>
                {lead.requirements && <p className="mt-1 text-xs text-muted-soft">{lead.requirements}</p>}
                <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-soft">
                  <a href={`mailto:${lead.email}`} className="hover:text-signal">
                    {lead.email}
                  </a>
                  {lead.phone && (
                    <a href={`tel:${lead.phone}`} className="hover:text-signal">
                      {lead.phone}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-soft">Received {formatDate(lead.createdAt)}</span>
                <LeadStatusSelect leadId={lead.id} status={lead.status} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
