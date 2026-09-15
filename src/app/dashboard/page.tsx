import Link from "next/link";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { demoProperties } from "@/lib/demo-properties";
import { demoLeads, LEAD_STATUS_LABELS } from "@/lib/demo-leads";
import { formatDate } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const activeProperties = demoProperties.filter((p) => p.status === "active").length;
  const newLeads = demoLeads.filter((l) => l.status === "new").length;
  const qualifiedLeads = demoLeads.filter((l) =>
    ["qualified", "viewing-requested", "viewing-booked", "viewing-completed", "won"].includes(l.status),
  ).length;
  const viewings = demoLeads.filter((l) =>
    ["viewing-requested", "viewing-booked", "viewing-completed"].includes(l.status),
  ).length;
  const won = demoLeads.filter((l) => l.status === "won").length;
  const closed = demoLeads.filter((l) => l.status === "won" || l.status === "lost").length;
  const conversionRate = closed > 0 ? Math.round((won / closed) * 100) : 0;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Active properties" value={String(activeProperties)} />
        <StatCard label="New leads" value={String(newLeads)} />
        <StatCard label="Qualified leads" value={String(qualifiedLeads)} />
        <StatCard label="Viewings" value={String(viewings)} />
        <StatCard label="Conversion rate" value={`${conversionRate}%`} hint="Won ÷ closed" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-graphite">Recent leads</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted-soft">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Property</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {demoLeads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3 font-medium text-graphite">{lead.name}</td>
                  <td className="px-5 py-3 text-muted">{lead.propertyTitle}</td>
                  <td className="px-5 py-3">
                    <Badge tone="blue">{LEAD_STATUS_LABELS[lead.status]}</Badge>
                  </td>
                  <td className="px-5 py-3 text-muted">{formatDate(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/dashboard/leads" className="mt-3 inline-block text-sm font-medium text-signal hover:text-signal-dark">
          View all leads →
        </Link>
      </div>
    </div>
  );
}
