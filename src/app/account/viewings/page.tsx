import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/states";
import { Button } from "@/components/ui/button";
import { demoViewingRequests } from "@/lib/demo-leads";
import { formatDate } from "@/lib/utils";

export default function ViewingRequestsPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-graphite">Viewing requests</h2>
      <p className="mt-2 max-w-lg text-sm text-muted">
        Requests you send from a property page go to a demo endpoint that isn&rsquo;t tied to
        your browser session, so the example below illustrates the page rather than showing
        your own submissions live.
      </p>

      {demoViewingRequests.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No viewing requests yet"
            description="Request a viewing from any property page and it will appear here."
            action={<Button href="/search">Find a property</Button>}
          />
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {demoViewingRequests.map((v) => (
            <li key={v.id} className="rounded-xl border border-line bg-white px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-graphite">{v.propertyTitle}</p>
                <Badge tone="blue">Requested</Badge>
              </div>
              <p className="mt-1 text-sm text-muted">
                {v.preferredDay} · {v.preferredTime}
              </p>
              {v.message && <p className="mt-2 text-sm text-muted">&ldquo;{v.message}&rdquo;</p>}
              <p className="mt-2 text-xs text-muted-soft">Sent {formatDate(v.createdAt)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
