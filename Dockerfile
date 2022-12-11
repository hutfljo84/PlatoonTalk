FROM node:latest

WORKDIR /apps

COPY . .

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "start", "front-end", "backend"]