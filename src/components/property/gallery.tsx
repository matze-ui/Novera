"use client";

import { useState } from "react";
import type { PropertyImage } from "@/lib/types";
import { PropertyArt } from "@/components/property/property-art";
import { DemoBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Gallery({ images }: { images: PropertyImage[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
        <PropertyArt image={images[active]} priority />
        <div className="absolute left-4 top-4">
          <DemoBadge />
        </div>
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar">
          {images.map((image, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={active === i}
              className={cn(
                "h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                active === i ? "border-signal" : "border-transparent",
              )}
            >
              <PropertyArt image={image} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
