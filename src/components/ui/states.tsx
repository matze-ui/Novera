import { cn } from "@/lib/utils";

function StateShell({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white/60 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-line-soft text-muted">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-graphite">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function EmptyState(props: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <StateShell
      {...props}
      icon={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M3 10h14M10 3v14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      }
    />
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <StateShell
      title={title}
      description={description}
      className={className}
      icon={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M10 6v5M10 14h.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      }
      action={
        onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-full bg-graphite px-5 py-2.5 text-sm font-medium text-white hover:bg-graphite-soft"
          >
            Try again
          </button>
        )
      }
    />
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-14 text-sm text-muted" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-signal" />
      {label}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-line bg-white">
      <div className="aspect-[4/3] bg-line-soft" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-2/3 rounded bg-line-soft" />
        <div className="h-3 w-1/2 rounded bg-line-soft" />
        <div className="h-3 w-1/3 rounded bg-line-soft" />
      </div>
    </div>
  );
}
