# Stage 1: Build the app with dev dependencies
FROM node:24-alpine AS builder

WORKDIR /repo

# Copy everything needed for workspace resolution
COPY . .
RUN corepack enable

# Install all dependencies (monorepo-aware)
RUN yarn install --immutable

# Build the app
RUN yarn build

# Stage 2: Final image with only what's needed to run
FROM node:24-alpine

WORKDIR /app

# Copy yarn context and root deps
COPY ./.yarn            ./.yarn
COPY ./.yarnrc.yml      ./.yarnrc.yml
COPY ./package.json     ./package.json
COPY ./yarn.lock        ./yarn.lock

# Copy app package.json so workspace focus works
RUN mkdir -p ./packages/app
COPY ./packages/app/package.json ./packages/app/package.json

RUN corepack enable

# Copy built output and server file
COPY --from=builder /repo/packages/app/build ./packages/app/build
COPY --from=builder /repo/packages/app/server.js ./packages/app/server.js

EXPOSE 8080

CMD ["yarn", "workspace", "@nccl/parent-portal", "start"]
