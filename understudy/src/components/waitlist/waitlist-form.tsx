"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WaitlistSource } from "@/lib/types";
import { WAITLIST_ENDPOINT } from "@/lib/config";

type Status = "idle" | "submitting" | "joined" | "error";

interface Props {
  source: WaitlistSource;
  /** "inline" is the email-only bar; "full" adds company and the use-case field. */
  variant?: "inline" | "full";
  onStage?: boolean;
  className?: string;
}

export function WaitlistForm({
  source,
  variant = "inline",
  onStage = false,
  className,
}: Props) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [useCase, setUseCase] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, useCase, website, source }),
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        setError(payload?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setPosition(typeof payload?.position === "number" ? payload.position : null);
      setAlreadyJoined(Boolean(payload?.alreadyJoined));
      setStatus("joined");
    } catch {
      setError("We couldn't reach the server. Please check your connection.");
      setStatus("error");
    }
  }

  // No endpoint configured (static build): say so plainly instead of
  // rendering an input that would throw on submit.
  if (!WAITLIST_ENDPOINT) {
    return (
      <div
        className={cn(
          "rounded-2xl border px-5 py-5",
          onStage ? "border-stage-line bg-stage-raised" : "border-line bg-paper-sunk",
          className,
        )}
      >
        <p className={cn("text-sm font-semibold", onStage ? "text-chalk" : "text-ink")}>
          The waitlist opens shortly.
        </p>
        <p className={cn("mt-1 text-sm", onStage ? "text-dim" : "text-muted")}>
          This preview isn&rsquo;t collecting sign-ups yet — we&rsquo;d rather say so
          than take your address and lose it.
        </p>
      </div>
    );
  }

  if (status === "joined") {
    return (
      <div
        className={cn(
          "rounded-2xl border px-5 py-5",
          onStage
            ? "border-cue-bright/35 bg-cue-bright/[0.10]"
            : "border-cue/30 bg-cue-tint",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3 text-left">
          <span
            className={cn(
              "mt-1 h-2 w-2 shrink-0 rounded-full",
              onStage ? "bg-cue-bright" : "bg-cue",
            )}
          />
          <div>
            <p
              className={cn(
                "text-sm font-semibold",
                onStage ? "text-chalk" : "text-ink",
              )}
            >
              {alreadyJoined ? "You're already on the list." : "You're on the list."}
              {position ? (
                <span className={onStage ? "text-cue-bright" : "text-cue-ink"}>
                  {" "}
                  No. {position}.
                </span>
              ) : null}
            </p>
            <p className={cn("mt-1 text-sm", onStage ? "text-dim" : "text-muted")}>
              We&rsquo;ll email you before the first pilot cohort opens. No other mail,
              and you can leave the list from any message we send.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const fieldBase = cn(
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors",
    onStage
      ? "border-stage-line bg-stage-raised text-chalk placeholder:text-dim/70 focus:border-cue-bright"
      : "border-line bg-paper-raised text-ink placeholder:text-muted/70 focus:border-cue",
  );

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)} noValidate>
      {/*
        Honeypot. Hidden from sight and from assistive tech, and taken out of
        the tab order — a human never fills this in, so anything that does is
        treated as a bot by the API.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {variant === "full" && (
        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${id}-email`}
              className={cn(
                "mb-1.5 block text-xs font-medium",
                onStage ? "text-dim" : "text-muted",
              )}
            >
              Work email
            </label>
            <input
              id={`${id}-email`}
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className={fieldBase}
            />
          </div>
          <div>
            <label
              htmlFor={`${id}-company`}
              className={cn(
                "mb-1.5 block text-xs font-medium",
                onStage ? "text-dim" : "text-muted",
              )}
            >
              Company <span className="font-normal opacity-70">(optional)</span>
            </label>
            <input
              id={`${id}-company`}
              type="text"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme GmbH"
              className={fieldBase}
            />
          </div>
        </div>
      )}

      {variant === "full" && (
        <div className="mb-4">
          <label
            htmlFor={`${id}-usecase`}
            className={cn(
              "mb-1.5 block text-xs font-medium",
              onStage ? "text-dim" : "text-muted",
            )}
          >
            What would you hand over first?{" "}
            <span className="font-normal opacity-70">(optional)</span>
          </label>
          <textarea
            id={`${id}-usecase`}
            rows={3}
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            placeholder="e.g. matching supplier invoices against POs and chasing the mismatches"
            className={cn(fieldBase, "resize-y")}
          />
        </div>
      )}

      {variant === "inline" ? (
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor={`${id}-email`} className="sr-only">
            Work email
          </label>
          <input
            id={`${id}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={fieldBase}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="shrink-0 sm:px-7"
          >
            {status === "submitting" ? "Joining…" : "Join the waitlist"}
          </Button>
        </div>
      ) : (
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto sm:px-8"
        >
          {status === "submitting" ? "Joining…" : "Request early access"}
        </Button>
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn(
            "mt-2.5 text-xs font-medium",
            onStage ? "text-alarm-lit" : "text-alarm",
          )}
        >
          {error}
        </p>
      )}
    </form>
  );
}
