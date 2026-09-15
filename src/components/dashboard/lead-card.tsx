import type { Lead } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="font-medium text-graphite">{lead.name}</p>
      <p className="text-xs text-muted-soft">{lead.propertyTitle}</p>
      {lead.notes && <p className="mt-2 text-sm text-muted">{lead.notes}</p>}
      <div className="mt-3 flex items-center justify-between text-xs text-muted-soft">
        <span>Created {formatDate(lead.createdAt)}</span>
      </div>
      <p className="mt-1 text-xs font-medium text-signal">Next: {lead.nextAction}</p>
    </div>
  );
}
