#!/bin/bash

set -euo pipefail
ROOT_DIR=$(dirname "$(realpath "$0")")


# 1. Build the monorepo (adjust this for Turbo or your setup)
echo "📦 Building monorepo..."
npm run build

# 2. Trim 
# echo "✂️ Trim to production dependencies..."
# yarn workspaces focus --production --all

# 3. Start containers in the background
echo "🚀 Starting Docker services..."
docker compose -f docker-compose.spec.yml --progress plain up -d --build

# 4. Wait for DB and API to become healthy
echo "⏳ Waiting for DB and API to be healthy..."
sleep 3 # or implement healthcheck poll

# 5. Run migrations and seeding inside the API container
echo "🛠️ Running migrations and seed..."
cd packages/api
NODE_ENV="test:host" yarn prisma migrate reset --force --skip-generate
