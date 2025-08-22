#!/bin/bash

set -euo pipefail
ROOT_DIR=$(dirname "$(realpath "$0")")

echo "⏳ Loading Environment..."
node ./scripts/load-e2e-env.js

# # Start containers in the background
echo "🚀 Starting Docker services..."
pwd
docker compose -f docker-compose.spec.yml --env-file ./.env.spec --progress plain up -d --build

# Wait for DB and API to become healthy
echo "⏳ Waiting for DB and API to be healthy..."
docker compose wait # or implement healthcheck poll

# # Run migrations and seeding inside the API container
# echo "🛠️ Running migrations and seed..."
# cd packages/api
# yarn prisma migrate reset --force --skip-generate