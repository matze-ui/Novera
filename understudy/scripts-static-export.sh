#!/usr/bin/env bash
# Build a static export of the landing page for GitHub Pages.
#
# Pages cannot run server code, so the API route, the /admin page and the
# middleware are removed from a throwaway copy of the project before building.
# The real app is untouched; only this copy loses them.
#
# BASE_PATH must match the Pages sub-path for a project site
# (https://<user>.github.io/<repo> -> BASE_PATH=/<repo>).
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="$HERE/.static-build"
OUT_DIR="$HERE/out"
BASE_PATH="${BASE_PATH:-}"

rm -rf "$BUILD_DIR" "$OUT_DIR"
mkdir -p "$BUILD_DIR"

tar -cf - \
  --exclude=node_modules --exclude=.next --exclude=.static-build \
  --exclude=out --exclude=.data --exclude=.git \
  -C "$HERE" . | tar -xf - -C "$BUILD_DIR"

# Anything that needs a server at request time cannot exist in a static export.
rm -rf "$BUILD_DIR/src/app/api" "$BUILD_DIR/src/app/admin" "$BUILD_DIR/middleware.ts"

cat > "$BUILD_DIR/next.config.ts" <<CFG
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "${BASE_PATH}",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
CFG

ln -s "$HERE/node_modules" "$BUILD_DIR/node_modules"

# Empty endpoint -> the forms render "the waitlist opens shortly" instead of
# an input that would post into the void.
cd "$BUILD_DIR"
NEXT_PUBLIC_WAITLIST_ENDPOINT="" \
NEXT_PUBLIC_SITE_URL="${SITE_URL:-http://localhost:3000}" \
  npx next build

cp -r "$BUILD_DIR/out" "$OUT_DIR"
touch "$OUT_DIR/.nojekyll"   # keep Pages from hiding /_next
rm -rf "$BUILD_DIR"

echo "Static export ready: $OUT_DIR"
