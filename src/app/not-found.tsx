import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center py-14">
      <Container className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-signal">404</p>
        <h1 className="mt-3 text-2xl font-semibold text-graphite">Page not found</h1>
        <p className="mt-3 text-sm text-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or the property may no
          longer be available.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/">Go home</Button>
          <Button href="/search" variant="ghost">
            Find a property
          </Button>
        </div>
      </Container>
    </div>
  );
}
