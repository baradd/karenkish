# Build stage
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:14 AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --only=production
# COPY --from=build /app/build ./build
EXPOSE 80
CMD [ "node", "app.js" ]