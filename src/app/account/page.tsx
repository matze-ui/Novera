import { Button } from "@/components/ui/button";
import { PropertyGrid } from "@/components/property/property-grid";
import { demoProperties } from "@/lib/demo-properties";
import { DEFAULT_MATCH_PREFERENCES, matchProperties } from "@/lib/match";

export default function MyMatchesPage() {
  const results = matchProperties(DEFAULT_MATCH_PREFERENCES, demoProperties).slice(0, 3);

  return (
    <div>
      <h2 className="text-lg font-semibold text-graphite">My matches</h2>
      <p className="mt-2 max-w-lg text-sm text-muted">
        Run NOVERA Match to get a personalized ranking. Below is an example set of matches
        using sample preferences, so you can see the shape of this page.
      </p>
      <Button href="/match" className="mt-4">
        Run NOVERA Match
      </Button>
      <div className="mt-8">
        <PropertyGrid
          properties={results.map((r) => r.property)}
          matchScores={Object.fromEntries(results.map((r) => [r.property.slug, r.score]))}
        />
      </div>
    </div>
  );
}
