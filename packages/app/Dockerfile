FROM node:24-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY . .

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app-user

# # Copy in prebuilt files
COPY --from=builder --chown=api-user:nodejs /app/build /app/build
COPY --from=builder --chown=api-user:nodejs /app/server.js /app/server.js
COPY --from=builder --chown=api-user:nodejs /app/package.json /app/package.json

# Debug step: output what's been copied
RUN echo "✅ Contents of /app after COPY:" && ls -alh /app && \
    echo "📁 Contents of /app/build:" && ls -alh /app/build || echo "❌ build/ missing"

USER app=user
ENV PORT=8080
EXPOSE 8080

CMD ["node", "app/server.js"]