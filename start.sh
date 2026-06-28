#!/bin/sh
set -e

# In production, /data is the Railway persistent volume.
# Symlink it so Next.js serves uploads as static files from /public/uploads.
if [ -n "$RAILWAY_ENVIRONMENT" ]; then
  mkdir -p /data/uploads/avatars
  # Preserve static website images on the persistent volume (cp -rn = skip if already there)
  if [ -d /app/public/uploads/website ]; then
    mkdir -p /data/uploads/website
    cp -rn /app/public/uploads/website/. /data/uploads/website/
  fi
  # Replace public/uploads with symlink to persistent volume
  rm -rf /app/public/uploads
  ln -sfn /data/uploads /app/public/uploads
fi

# Run any pending migrations
npx prisma migrate deploy

# Seed admin user (idempotent — safe to run every boot)
npx ts-node --project tsconfig.json prisma/seed.ts || echo "Seed failed (non-fatal)"

exec node server.js
