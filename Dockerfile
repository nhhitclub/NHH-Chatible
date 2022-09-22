# FROM node:lts AS packageInstaller

# ENV NODE_ENV=production

# RUN npm install --global gulp next 

# WORKDIR /app

# COPY ["package.json", "package-lock.json*", "./"]

# RUN npm install

# COPY . .

# EXPOSE 3000

# RUN gulp

# RUN npx next build

# # RUN chown -R node /usr/src/app

# USER node

# CMD ["npm", "start"]




FROM node:lts AS packageInstaller
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:lts as buildTool
WORKDIR /app
COPY --from=packageInstaller /app/node_modules ./node_modules
COPY . .
RUN npx gulp
RUN npx next build

FROM node:lts as run
WORKDIR /app
COPY --from=buildTool . .

CMD ["node", "./dist/index.js"]


