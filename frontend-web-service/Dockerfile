FROM node:alpine

WORKDIR /usr/frontend-web-service

COPY package*.json ./
RUN yarn

COPY . .

RUN yarn build

EXPOSE ${VITE_DEV_SERVER_PORT}

CMD ["yarn", "start:prod"]