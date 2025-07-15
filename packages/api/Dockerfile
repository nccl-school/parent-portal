FROM node:24-alpine AS base

FROM base AS builder

WORKDIR /app

COPY . .

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api-user

COPY --from=builder --chown=api-user:nodejs /app/dist           /app

USER api-user
EXPOSE 8080

CMD ["node", "/app/index.js"]