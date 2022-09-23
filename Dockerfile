
FROM node:lts
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx gulp
RUN npx next build
CMD ["node", "./dist/index.js"]