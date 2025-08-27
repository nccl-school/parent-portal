#!/bin/bash

set -euo pipefail
ROOT_DIR=$(dirname "$(realpath "$0")")

echo "⏳ Setup testing environment..."
node ./scripts/e2e.setup-environment.js

# Start containers in the background
echo "🚀 Starting Docker services..."
pwd
docker compose -f docker-compose.spec.yml --env-file ./.env.spec --progress plain up -d --build

