# product-service/Dockerfile
FROM node:14

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]