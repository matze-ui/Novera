import type { Metadata } from "next";
import { getSignups } from "@/lib/server/waitlist-store";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Waitlist",
  robots: { index: false, follow: false },
};

// Always read the file fresh — a cached signup list is a useless signup list.
export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });
}

export default async function AdminPage() {
  const signups = await getSignups();

  const bySource = signups.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.source] = (acc[entry.source] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-paper py-14">
      <Container>
        <h1 className="u-display text-4xl text-ink">Waitlist</h1>
        <p className="mt-2 text-sm text-muted">
          {signups.length} {signups.length === 1 ? "signup" : "signups"}
          {Object.keys(bySource).length > 0 && (
            <>
              {" — "}
              {Object.entries(bySource)
                .map(([source, count]) => `${source}: ${count}`)
                .join(", ")}
            </>
          )}
        </p>

        {signups.length === 0 ? (
          <p className="mt-10 rounded-xl border border-dashed border-line bg-paper-raised p-8 text-center text-sm text-muted">
            No signups yet. They&rsquo;ll appear here as they come in.
          </p>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-paper-raised">
            <table className="w-full min-w-[56rem] text-left text-sm">
              <thead className="border-b border-line bg-paper-sunk">
                <tr className="u-eyebrow text-muted">
                  <th className="px-4 py-3 font-normal">#</th>
                  <th className="px-4 py-3 font-normal">Email</th>
                  <th className="px-4 py-3 font-normal">Company</th>
                  <th className="px-4 py-3 font-normal">Use case</th>
                  <th className="px-4 py-3 font-normal">Source</th>
                  <th className="px-4 py-3 font-normal">Joined (UTC)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {signups.map((entry) => (
                  <tr key={entry.id} className="align-top">
                    <td className="px-4 py-3 font-mono text-xs text-muted">
                      {entry.position}
                    </td>
                    <td className="px-4 py-3 font-medium text-ink">{entry.email}</td>
                    <td className="px-4 py-3 text-muted">{entry.company || "—"}</td>
                    <td className="max-w-md px-4 py-3 text-muted">
                      {entry.useCase || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-spot-tint px-2 py-0.5 text-xs text-spot-ink">
                        {entry.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs whitespace-nowrap text-muted">
                      {formatDate(entry.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}
