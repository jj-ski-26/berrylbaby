FROM node:22.13-slim AS base

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npx prisma generate

COPY . .
RUN npm run build

# Production image
FROM node:22.13-slim AS runner

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production

# Standalone server + static assets
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

# Full node_modules (needed for prisma CLI at runtime)
COPY --from=base /app/node_modules ./node_modules

# Prisma schema + migrations
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/prisma.config.ts ./

COPY start.sh ./

EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "start.sh"]
