FROM node:alpine

WORKDIR /usr/frontend-web-service

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE ${PORT}

CMD ["yarn", "server"]