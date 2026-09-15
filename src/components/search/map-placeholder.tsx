export function MapPlaceholder() {
  return (
    <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-line-soft p-8 text-center">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="text-muted">
        <path
          d="M14 25s9-7.5 9-14a9 9 0 1 0-18 0c0 6.5 9 14 9 14Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <p className="mt-3 text-sm font-medium text-graphite">Map view coming soon</p>
      <p className="mt-1 max-w-xs text-xs text-muted">
        NOVERA is built to support a map view once a mapping provider is connected.
        We&rsquo;re not showing a fake map in the meantime.
      </p>
    </div>
  );
}
