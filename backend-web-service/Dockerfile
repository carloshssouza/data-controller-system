FROM node

WORKDIR /usr/backend-web-service

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE ${PORT}

CMD ["yarn", "start:prod"]