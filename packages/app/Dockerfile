# Stage 1: Build the app with dev dependencies
FROM node:24-alpine AS builder

WORKDIR /repo

# Copy everything needed for workspace resolution
COPY . .

# Stage 2: Final image with only what's needed to run
FROM node:24-alpine

WORKDIR /app

# Copy built output and server file
COPY --from=builder /repo/build            ./build
COPY --from=builder /repo/server.js        ./server.js

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]