FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --omit=dev
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "app.js"]