"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Status = "idle" | "submitting" | "requested" | "error";

export function ViewingRequestModal({
  open,
  onClose,
  propertySlug,
  propertyTitle,
}: {
  open: boolean;
  onClose: () => void;
  propertySlug: string;
  propertyTitle: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDay, setPreferredDay] = useState("");
  const [preferredTime, setPreferredTime] = useState("Afternoon");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/viewing-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertySlug, name, email, preferredDay, preferredTime, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("requested");
    } catch {
      setStatus("error");
    }
  }

  function handleClose() {
    onClose();
    if (status === "requested") {
      setStatus("idle");
      setName("");
      setEmail("");
      setPreferredDay("");
      setMessage("");
    }
  }

  return (
    <Modal open={open} onClose={handleClose} title={`Request a viewing`}>
      {status === "requested" ? (
        <div className="text-center">
          <Badge tone="success" className="mx-auto">
            Requested
          </Badge>
          <p className="mt-4 text-sm text-graphite">
            Your viewing request for <strong>{propertyTitle}</strong> has been sent.
          </p>
          <p className="mt-2 text-sm text-muted">
            This is a request, not a confirmed booking. Because NOVERA is not yet
            connected to a real calendar, no one has been notified automatically — treat
            this as a demo of the flow.
          </p>
          <Button onClick={handleClose} className="mt-6">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-muted">
            For <strong className="text-graphite">{propertyTitle}</strong>
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">Your name</span>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">Preferred day</span>
              <input
                type="date"
                required
                value={preferredDay}
                onChange={(e) => setPreferredDay(e.target.value)}
                className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">Preferred time</span>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-signal"
              >
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">Message (optional)</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
            />
          </label>

          {status === "error" && (
            <p className="text-sm text-red-600" role="alert">
              Something went wrong sending your request. Please try again.
            </p>
          )}

          <Button type="submit" disabled={status === "submitting"} className="w-full justify-center">
            {status === "submitting" ? "Sending…" : "Send viewing request"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
