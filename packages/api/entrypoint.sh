#!/bin/sh
set -e

echo "🏃 Running Prisma migrations..."
npx prisma migrate deploy --schema /app/prisma/schema.prisma

echo "🌱 Seeding DB..."
npx prisma db seed --config /app/prisma.config.ts

echo "🚀 Starting API server..."
exec node /app/dist/index.js