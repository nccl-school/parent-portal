FROM node:24-alpine AS base

FROM base AS builder

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY . .

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app-user

# Copy in prebuilt files
# - /env is copied in so we can run the sentry instrumentation
COPY --from=builder --chown=api-user:nodejs /app/node_modules                               /app/node_modules
COPY --from=builder --chown=api-user:nodejs /app/packages/env                               /app/packages/env 
COPY --from=builder --chown=app-user:nodejs /app/packages/app/build                         /app/build
COPY --from=builder --chown=app-user:nodejs /app/packages/app/server.js                     /app/server.js
COPY --from=builder --chown=app-user:nodejs /app/packages/app/server.instrumentation.js     /app/server.instrumentation.js
COPY --from=builder --chown=app-user:nodejs /app/packages/app/package.json                  /app/package.json

USER app-user
ENV PORT=8080
ENV NODE_OPTIONS="--import /app/server.instrumentation.js"

EXPOSE 8080

CMD ["node", "/app/server.js"]