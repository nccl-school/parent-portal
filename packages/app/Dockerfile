FROM node:24-alpine

WORKDIR /app

# Copy in prebuilt files
COPY build ./build
COPY server.js ./server.js

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]