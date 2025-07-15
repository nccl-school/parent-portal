FROM node:24-alpine AS base

FROM base AS builder

WORKDIR /app

COPY . .

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app-user

# # Copy in prebuilt files
COPY --from=builder --chown=api-user:nodejs /app/node_modules                   /node_modules
COPY --from=builder --chown=app-user:nodejs /app/packages/app/build             /build
COPY --from=builder --chown=app-user:nodejs /app/packages/app/server.js         /server.js
COPY --from=builder --chown=app-user:nodejs /app/packages/app/package.json      /package.json

USER app=app-user
ENV PORT=8080
EXPOSE 8080

CMD ["node", "app/server.js"]