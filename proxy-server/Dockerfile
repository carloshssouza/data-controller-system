FROM node

WORKDIR /usr/proxy-server

COPY package*.json ./
RUN yarn

COPY . .

RUN yarn build

EXPOSE ${PROXY_PORT}

CMD ["yarn", "start:prod"]