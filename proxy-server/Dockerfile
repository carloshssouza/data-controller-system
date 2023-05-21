FROM node

WORKDIR /usr/proxy-server

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE ${PROXY_PORT}