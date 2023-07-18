FROM node:20-slim

WORKDIR /JWT/server

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 4111

CMD [ "npm", "start" ]
