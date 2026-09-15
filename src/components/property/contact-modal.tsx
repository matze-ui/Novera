"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "sent" | "error";

export function ContactModal({
  open,
  onClose,
  propertyTitle,
}: {
  open: boolean;
  onClose: () => void;
  propertyTitle: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(`Hi, I'm interested in ${propertyTitle}.`);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          payload: { propertyTitle, name, email, message },
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Contact about this property">
      {status === "sent" ? (
        <div className="text-center">
          <p className="text-sm text-graphite">Thanks — your message has been recorded.</p>
          <p className="mt-2 text-sm text-muted">
            This is a demo enquiry flow: nothing is emailed yet because no owner contact
            details are connected. A production version will notify the listing owner
            directly.
          </p>
          <Button onClick={onClose} className="mt-6">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <span className="mb-1 block text-xs font-medium text-muted">Message</span>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-signal"
            />
          </label>
          {status === "error" && (
            <p className="text-sm text-red-600" role="alert">
              Something went wrong sending your message. Please try again.
            </p>
          )}
          <Button type="submit" disabled={status === "submitting"} className="w-full justify-center">
            {status === "submitting" ? "Sending…" : "Send message"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
