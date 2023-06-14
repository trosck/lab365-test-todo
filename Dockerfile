FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV production

RUN npm run build

CMD [ "node", "dist/main.js" ]
