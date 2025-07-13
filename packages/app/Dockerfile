FROM node:24-alpine

WORKDIR /app

# Copy built output and server file
COPY ./build            ./build
COPY ./server.js        ./server.js

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]