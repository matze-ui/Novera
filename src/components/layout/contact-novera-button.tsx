"use client";

import { useState } from "react";
import { ContactModal } from "@/components/property/contact-modal";
import { cn } from "@/lib/utils";

export function ContactNoveraButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("text-sm font-medium text-graphite/80 hover:text-graphite", className)}
      >
        Contact NOVERA
      </button>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
