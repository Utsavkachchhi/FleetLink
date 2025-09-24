# server/Dockerfile
# Use multi-stage so we install production deps only
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./

RUN npm install

FROM node:22-alpine AS runner
WORKDIR /app

# copy production node_modules
COPY --from=deps /app/node_modules ./node_modules
# copy app code
COPY . .
EXPOSE 8080
# If you have build step (e.g., ts -> js), run build in deps stage and copy artifacts
CMD ["node", "server.js"]
