FROM node:24-alpine AS base

FROM base AS builder

WORKDIR /app

COPY . .

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app-user

# # Copy in prebuilt files
COPY --from=builder --chown=api-user:nodejs /app/node_modules                   /app/node_modules
COPY --from=builder --chown=app-user:nodejs /app/packages/app/build             /app/build
COPY --from=builder --chown=app-user:nodejs /app/packages/app/server.js         /app/server.js
COPY --from=builder --chown=app-user:nodejs /app/packages/app/package.json      /app/package.json

USER app=app-user
ENV PORT=8080
EXPOSE 8080

CMD ["node", "app/server.js"]