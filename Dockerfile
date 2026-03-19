# Dockerfile
# Stage 1: Building the application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .

# Run the build
RUN npm run build

# Stage 2: Running the application
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from the builder
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/_docs ./_docs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
