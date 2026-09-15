import { Badge } from "@/components/ui/badge";
import { demoProperties } from "@/lib/demo-properties";
import { demoLeads } from "@/lib/demo-leads";
import { formatPrice } from "@/lib/utils";

function exampleReach(seed: string): number {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) % 9973;
  return 400 + (hash % 2200);
}

export default function DashboardPropertiesPage() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-graphite">Properties</h2>
        <Badge tone="warning">Reach figures are examples</Badge>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wide text-muted-soft">
            <tr>
              <th className="px-5 py-3">Property</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Reach</th>
              <th className="px-5 py-3">Interest</th>
              <th className="px-5 py-3">Qualified leads</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {demoProperties.map((property) => {
              const leadsForProperty = demoLeads.filter((l) => l.propertyTitle === property.title);
              const qualified = leadsForProperty.filter((l) =>
                ["qualified", "viewing-requested", "viewing-booked", "viewing-completed", "won"].includes(
                  l.status,
                ),
              ).length;
              const reach = exampleReach(property.id);
              return (
                <tr key={property.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3 font-medium text-graphite">{property.title}</td>
                  <td className="px-5 py-3 text-muted">{formatPrice(property)}</td>
                  <td className="px-5 py-3 text-muted">{reach.toLocaleString("en-US")}</td>
                  <td className="px-5 py-3 text-muted">{leadsForProperty.length}</td>
                  <td className="px-5 py-3 text-muted">{qualified}</td>
                  <td className="px-5 py-3">
                    <Badge
                      tone={
                        property.status === "active"
                          ? "success"
                          : property.status === "under-offer"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {property.status === "active"
                        ? "Active"
                        : property.status === "under-offer"
                          ? "Under offer"
                          : "Unavailable"}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
