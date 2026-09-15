"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ViewingRequestModal } from "@/components/property/viewing-request-modal";
import { ContactModal } from "@/components/property/contact-modal";
import { isSaved, toggleSaved, SAVED_PROPERTIES_EVENT } from "@/lib/saved-properties";
import { useExternalValue } from "@/lib/use-external-value";

export function PropertyActions({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const [viewingOpen, setViewingOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const saved = useExternalValue(() => isSaved(slug), SAVED_PROPERTIES_EVENT, false);

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => setViewingOpen(true)} size="lg" className="flex-1 justify-center">
          Request a viewing
        </Button>
        <Button
          onClick={() => toggleSaved(slug)}
          variant={saved ? "secondary" : "ghost"}
          size="lg"
          aria-pressed={saved}
          className="flex-1 justify-center"
        >
          {saved ? "Saved" : "Save property"}
        </Button>
        <Button onClick={() => setContactOpen(true)} variant="ghost" size="lg" className="flex-1 justify-center">
          Contact
        </Button>
      </div>

      <ViewingRequestModal
        open={viewingOpen}
        onClose={() => setViewingOpen(false)}
        propertySlug={slug}
        propertyTitle={title}
      />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} propertyTitle={title} />
    </>
  );
}
