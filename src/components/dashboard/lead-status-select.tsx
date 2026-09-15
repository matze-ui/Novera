"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateLeadStatusAction } from "@/lib/server/lead-actions";
import type { LeadStatus } from "@/lib/types";
import { LEAD_STATUS_LABELS, LEAD_PIPELINE_ORDER } from "@/lib/leads";
import { cn } from "@/lib/utils";

export function LeadStatusSelect({
  leadId,
  status,
  className,
}: {
  leadId: string;
  status: LeadStatus;
  className?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as LeadStatus;
        startTransition(async () => {
          await updateLeadStatusAction(leadId, next);
          router.refresh();
        });
      }}
      aria-label="Lead status"
      className={cn(
        "rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-medium text-graphite outline-none focus:border-signal disabled:opacity-50",
        className,
      )}
    >
      {LEAD_PIPELINE_ORDER.map((s) => (
        <option key={s} value={s}>
          {LEAD_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
