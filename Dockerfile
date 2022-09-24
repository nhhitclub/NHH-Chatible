FROM node:lts-alpine

WORKDIR /node

COPY package.json package-lock.json ./

RUN npm install

WORKDIR /node/app

COPY . .

RUN npx gulp

RUN npx next build

EXPOSE 3000

CMD ["node","./dist/index.js"]