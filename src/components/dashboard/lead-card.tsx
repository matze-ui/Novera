import type { Lead } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { LeadStatusSelect } from "@/components/dashboard/lead-status-select";
import { LEAD_SOURCE_LABELS } from "@/lib/leads";
import { formatDate } from "@/lib/utils";

export function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-graphite">{lead.name}</p>
          <p className="text-xs text-muted-soft">{lead.propertyTitle}</p>
        </div>
        <Badge tone="outline">{LEAD_SOURCE_LABELS[lead.source]}</Badge>
      </div>
      <div className="mt-2 space-y-0.5 text-xs text-muted">
        <a href={`mailto:${lead.email}`} className="block hover:text-signal">
          {lead.email}
        </a>
        {lead.phone && (
          <a href={`tel:${lead.phone}`} className="block hover:text-signal">
            {lead.phone}
          </a>
        )}
      </div>
      {lead.requirements && <p className="mt-2 text-sm text-muted">{lead.requirements}</p>}
      {lead.message && <p className="mt-2 text-sm italic text-muted">&ldquo;{lead.message}&rdquo;</p>}
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-xs text-muted-soft">Received {formatDate(lead.createdAt)}</span>
        <LeadStatusSelect leadId={lead.id} status={lead.status} />
      </div>
    </div>
  );
}
