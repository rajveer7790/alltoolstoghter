FROM node:22-bookworm-slim
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --omit=dev && mkdir data && chown node:node data
COPY backend/server.js ./
COPY backend/src ./src
USER node
EXPOSE 8787
CMD ["node", "server.js"]
