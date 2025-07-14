FROM node:24-alpine

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api-user

COPY --chown=api-user:nodejs /app/node_modules /app/node_modules
COPY --chown=api-user:nodejs /app/dist /app/dist
COPY --chown=api-user:nodejs /app/package.json /app/package.json

USER api-user
EXPOSE 3000

CMD ["node", "/app/dist/index.js"]