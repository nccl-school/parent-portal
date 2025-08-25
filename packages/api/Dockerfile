FROM node:24-alpine AS base
FROM base AS builder

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY . .
RUN node ./scripts/validate.runtime.js

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api-user

COPY --from=builder --chown=api-user:nodejs /app/node_modules                   /app/node_modules
COPY --from=builder --chown=api-user:nodejs /app/packages/api/dist              /app/dist
COPY --from=builder --chown=api-user:nodejs /app/packages/api/prisma            /app/prisma
COPY --from=builder --chown=api-user:nodejs /app/packages/api/prisma.config.ts  /app/prisma.config.ts
COPY --from=builder --chown=api-user:nodejs /app/packages/api/package.json      /app/package.json
COPY --from=builder --chown=api-user:nodejs /app/packages/api/entrypoint.sh     /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

USER api-user
EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]