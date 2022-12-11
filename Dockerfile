FROM node:latest

WORKDIR /app

COPY . .

# COPY package.json ./
# COPY package-lock.json ./

RUN npm install

CMD ["npm", "run", "start", "front-end", "backend"]