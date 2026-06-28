#!/bin/sh
set -e

# In production, /data is the Railway persistent volume.
# Symlink it so Next.js serves uploads as static files from /public/uploads.
if [ -n "$RAILWAY_ENVIRONMENT" ]; then
  mkdir -p /data/uploads/avatars
  # Replace public/uploads with symlink to persistent volume
  rm -rf /app/public/uploads
  ln -sfn /data/uploads /app/public/uploads
fi

# Run any pending migrations
npx prisma migrate deploy

exec node server.js
