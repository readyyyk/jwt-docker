FROM node:20-slim

WORKDIR /JWT/client

COPY package*.json ./

RUN npm i

COPY . .

RUN [ "npm", "run", "build" ]

EXPOSE 4110

CMD [ "npm", "run", "preview" ]
