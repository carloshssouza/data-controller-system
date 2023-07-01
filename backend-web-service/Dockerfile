FROM node

WORKDIR /usr/backend-web-service

COPY package*.json ./
RUN yarn

COPY . .

RUN yarn build

EXPOSE ${EXPRESS_PORT}
EXPOSE ${GPRC_PORT}

CMD ["yarn", "start:prod"]