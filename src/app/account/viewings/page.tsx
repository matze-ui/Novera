import { EmptyState } from "@/components/ui/states";
import { Button } from "@/components/ui/button";

export default function ViewingRequestsPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-graphite">Viewing requests</h2>
      <p className="mt-2 max-w-lg text-sm text-muted">
        Sign-in isn&rsquo;t connected yet, so we can&rsquo;t show your personal request
        history here. Every viewing request you send from a property page still reaches the
        NOVERA team directly.
      </p>

      <div className="mt-8">
        <EmptyState
          title="Request a viewing from any property page"
          description="You'll get a confirmation there once it's sent."
          action={<Button href="/search">Find a property</Button>}
        />
      </div>
    </div>
  );
}
