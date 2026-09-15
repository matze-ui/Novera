# Multi-stage build producing a small, self-contained Next.js server image.
#
# This needs a host with a PERSISTENT FILESYSTEM (a VM, a container host
# with a mounted volume) — not serverless/edge (e.g. Vercel functions),
# where .data/leads.json would not survive between requests. See README.

FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-slim AS run
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Standalone output includes only the files needed to run the server.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Leads are written here at runtime — mount a volume onto this path
# (see docker-compose.yml) so they survive container restarts/redeploys.
RUN mkdir -p /app/.data
VOLUME ["/app/.data"]

EXPOSE 3000
CMD ["node", "server.js"]
