"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "joined" | "error";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact",
          name: email.split("@")[0] || "Premium waitlist",
          email,
          propertyTitle: "NOVERA Premium waitlist",
          message: "Wants to be notified when NOVERA Premium launches.",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("joined");
    } catch {
      setStatus("error");
    }
  }

  if (status === "joined") {
    return (
      <p className="mt-8 rounded-xl bg-signal-tint px-4 py-3 text-center text-sm font-medium text-signal-dark">
        You&rsquo;re on the list — we&rsquo;ll email you when Premium launches.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-2">
      <div className="flex gap-2">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-full border border-line px-4 py-3 text-sm outline-none focus:border-signal"
        />
        <Button type="submit" disabled={status === "submitting"} className="shrink-0">
          {status === "submitting" ? "Joining…" : "Notify me"}
        </Button>
      </div>
      {status === "error" && (
        <p className="text-center text-xs text-red-600" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
      <p className="text-center text-xs text-muted-soft">
        Premium isn&rsquo;t billable yet — no payment is collected. Payments will be added
        through Stripe or a similar provider before this launches.
      </p>
    </form>
  );
}
