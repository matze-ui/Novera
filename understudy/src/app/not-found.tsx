import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="on-stage bg-stage py-28">
      <Container className="text-center">
        <p className="u-eyebrow text-spot">404</p>
        <h1 className="u-display mt-4 text-5xl text-chalk">Not in this script.</h1>
        <p className="mx-auto mt-4 max-w-md text-dim">
          That page doesn&rsquo;t exist. The waitlist, however, does.
        </p>
        <ButtonLink href="/" className="mt-8">
          Back to the start
        </ButtonLink>
      </Container>
    </div>
  );
}
