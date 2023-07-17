# Build stage
FROM node:14 AS build
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:14 AS production
WORKDIR /
COPY --from=build /package*.json ./
RUN npm install --only=production
COPY --from=build / ./
# COPY --from=build /app/build ./build
EXPOSE 80:3000
CMD [ "node", "app.js" ]