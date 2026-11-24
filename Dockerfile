# syntax=docker/dockerfile:1
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY index.html tsconfig.json vite.config.ts ./
COPY src ./src
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
LABEL org.opencontainers.image.title="demo-commerce-web" \
      org.opencontainers.image.description="Storefront frontend - Demo Commerce Platform" \
      org.opencontainers.image.source="https://github.com/renanlJ/demo-commerce-web" \
      org.opencontainers.image.licenses="MIT"
COPY deploy/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY deploy/nginx/docker-entrypoint.sh /docker-entrypoint.sh
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
ENV PRODUCT_API_URL=http://demo-product-api:3000
ENTRYPOINT ["/docker-entrypoint.sh"]
