#!/bin/bash

set -euo pipefail
ROOT_DIR=$(dirname "$(realpath "$0")")

# Set the node environment
export NODE_ENV=test

# 1. Build the monorepo (adjust this for Turbo or your setup)
echo "📦 Building monorepo..."
npm run build

# 2. Copy Prisma engine
echo "🐳 Copy Prisma engine binary..."
cp packages/api/src/_generated/prisma/libquery_engine-darwin-arm64.dylib.node packages/api/dist/_generated/prisma/
cp packages/api/src/_generated/prisma/libquery_engine-linux-musl-arm64-openssl-3.0.x.so.node packages/api/dist/_generated/prisma/
cp packages/api/src/_generated/prisma/libquery_engine-linux-musl-openssl-3.0.x.so.node packages/api/dist/_generated/prisma/

# 3. Start containers in the background
echo "🚀 Starting Docker services..."
docker compose -f docker-compose.spec.yml up -d

# 4. Wait for DB and API to become healthy
echo "⏳ Waiting for DB and API to be healthy..."
sleep 5 # or implement healthcheck poll

# 5. Run migrations and seeding inside the API container
echo "🛠️ Running migrations and seed..."
cd packages/api
NODE_ENV=test yarn prisma migrate reset --force --skip-generate
