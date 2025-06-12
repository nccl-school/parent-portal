# # Stage 1: Build the app with dev dependencies
# FROM node:24-alpine AS builder

# ARG _TURBO_TOKEN
# ARG _TURBO_TEAM_ID

# WORKDIR /repo

# # Copy everything needed for workspace resolution
# COPY . .
# RUN corepack enable

# # Install all dependencies (monorepo-aware)
# RUN TURBO_TOKEN=${_TURBO_TOKEN} TURBO_TEAM_ID=${_TURBO_TEAM_ID} yarn install --immutable

# # Build the app
# RUN yarn build

# # Stage 2: Final image with only what's needed to run
# FROM node:24-alpine

# WORKDIR /app

# # Copy built output and server file
# COPY --from=builder /repo/package.json                  ./package.json
# COPY --from=builder /repo/node_modules                  ./node_modules
# COPY --from=builder /repo/.yarnrc.yml                   ./.yarnrc.yml
# COPY --from=builder /repo/yarn.lock                     ./yarn.lock

# COPY --from=builder /repo/packages/app/package.json     ./packages/app/package.json
# COPY --from=builder /repo/packages/app/build            ./packages/app/build
# COPY --from=builder /repo/packages/app/server.js        ./packages/app/server.js

# RUN corepack enable

# ENV PORT=8080
# EXPOSE 8080

# CMD ["yarn", "workspace", "@nccl/parent-portal", "start"]

# Stage 2: Final image with only what's needed to run
FROM node:24-alpine

WORKDIR /app

# Copy built output and server file
COPY package.json                  ./package.json
COPY node_modules                  ./node_modules
COPY .yarnrc.yml                   ./.yarnrc.yml
COPY yarn.lock                     ./yarn.lock

COPY packages/app/package.json     ./packages/app/package.json
COPY packages/app/build            ./packages/app/build
COPY packages/app/server.js        ./packages/app/server.js

RUN corepack enable

ENV PORT=8080
EXPOSE 8080

CMD ["yarn", "workspace", "@nccl/parent-portal", "start"]


# run: |
#     echo "Building $SERVICE_NAME"
#     gcloud builds submit . \
#       --tag gcr.io/${{ secrets.GCP_PROJECT_ID }}/${SERVICE_NAME} \
#       --substitutions=_TURBO_TOKEN="${{secrets.TURBO_TOKEN}}",_TURBO_TEAM_ID="${{secrets.TURBO_TEAM_ID}},_SERVICE_NAME="${{secrets.SERVICE_NAME}}",