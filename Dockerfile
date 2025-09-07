# Simple single-stage Dockerfile for Next.js 15 on Synology (Node 22 Alpine)
# Uses Yarn (via corepack) and works with Traefik routing through Compose

FROM node:22-alpine

# Working dir
WORKDIR /app

# Base env
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

# Needed by some native deps, and to keep images small and stable
RUN apk add --no-cache libc6-compat

# Enable Yarn via Corepack (respects package.json "packageManager")
RUN corepack enable

# Install deps first (better cache)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Make sure Synology's @eaDir folders never sneak in
RUN find /app -type d -name "@eaDir" -prune -exec rm -rf {} + || true

# Build-time public URL (also exported to runtime below)
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

# Build the Next.js app
RUN yarn build

# Drop privileges for runtime
RUN addgroup -S app && adduser -S -G app app
USER app

# App listens on 3000 by default
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0

# Start the production server
CMD ["yarn", "start"]

