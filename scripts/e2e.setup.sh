#!/bin/bash

set -euo pipefail
ROOT_DIR=$(dirname "$(realpath "$0")")


# Build the monorepo (adjust this for Turbo or your setup)
echo "📦 Building monorepo..."
yarn run build

# Start containers in the background
echo "🚀 Starting Docker services..."
docker compose -f docker-compose.spec.yml --progress plain up -d --build

# Wait for DB and API to become healthy
echo "⏳ Waiting for DB and API to be healthy..."
sleep 3 # or implement healthcheck poll

# Run migrations and seeding inside the API container
echo "🛠️ Running migrations and seed..."
cd packages/api
yarn prisma migrate reset --force --skip-generate
