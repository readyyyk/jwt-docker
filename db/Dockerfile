FROM node:20-slim

WORKDIR /JWT/db

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 4112

CMD [ "node", "index.js" ]
