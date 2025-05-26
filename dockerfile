# Dockerfile for autoexpress-client
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# For development, this uses Vite dev server
CMD ["npm", "run", "dev"]
