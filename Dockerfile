# ---- Stage 1: build the frontend ----
FROM node:20-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---- Stage 2: backend runtime that also serves the built SPA ----
# Debian slim (not alpine) so the native bcrypt module installs from prebuilt
# binaries instead of needing a full build toolchain.
FROM node:20-slim
WORKDIR /app/backend
ENV NODE_ENV=production
ENV PORT=3001

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/ ./
# Express serves the SPA from ./dist (see app.js: express.static("dist"))
COPY --from=frontend /app/frontend/dist ./dist

EXPOSE 3001
CMD ["node", "index.js"]
