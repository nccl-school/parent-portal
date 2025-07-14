FROM node:24-alpine

WORKDIR /app

# Debug step: output what's been copied
RUN echo "✅ Contents of /app after COPY:" && ls -alh /app && \
    echo "📁 Contents of /app/build:" && ls -alh /app/build || echo "❌ build/ missing"

# # Copy in prebuilt files
COPY build          ./build
COPY server.js      ./server.js

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]