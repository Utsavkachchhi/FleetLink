# client/Dockerfile
# 1) build stage
FROM node:22-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# adapt to your app: Vite -> npm run build (dist), CRA -> npm run build (build)
RUN npm run build

# 2) production stage (nginx)
FROM nginx:1.25-alpine AS production-stage
# Remove default nginx index if you like
RUN rm -rf /usr/share/nginx/html/*
# Vite outputs `dist`, CRA outputs `build` - change below if needed
# For Vite:
COPY --from=build-stage /app/dist /usr/share/nginx/html
# For CRA use:
# COPY --from=build-stage /app/build /usr/share/nginx/html

# copy nginx config (optional) to enable SPA fallback + proxy
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
