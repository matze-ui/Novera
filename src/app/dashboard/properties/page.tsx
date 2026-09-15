import { Badge } from "@/components/ui/badge";
import { demoProperties } from "@/lib/demo-properties";
import { getAllLeads } from "@/lib/server/lead-store";
import { formatPrice } from "@/lib/utils";

export default async function DashboardPropertiesPage() {
  const leads = await getAllLeads();

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-graphite">Properties</h2>
      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wide text-muted-soft">
            <tr>
              <th className="px-5 py-3">Property</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Leads</th>
              <th className="px-5 py-3">Qualified leads</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {demoProperties.map((property) => {
              const leadsForProperty = leads.filter((l) => l.propertyTitle === property.title);
              const qualified = leadsForProperty.filter((l) =>
                ["qualified", "viewing-requested", "viewing-booked", "viewing-completed", "won"].includes(
                  l.status,
                ),
              ).length;
              return (
                <tr key={property.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3 font-medium text-graphite">{property.title}</td>
                  <td className="px-5 py-3 text-muted">{formatPrice(property)}</td>
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
      <p className="mt-3 text-xs text-muted-soft">
        &ldquo;Leads&rdquo; counts requests whose property title matches this listing exactly
        (viewing requests and contact messages). NOVERA Match requests aren&rsquo;t tied to a
        single property — see the full pipeline in Leads.
      </p>
    </div>
  );
}
