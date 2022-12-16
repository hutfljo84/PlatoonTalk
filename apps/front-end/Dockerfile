FROM my-base-image:nx-base AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY package.json ./
RUN npm install
COPY . .
RUN npx nx build front-end ${BUILD_FLAG}
