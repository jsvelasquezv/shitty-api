# FROM node:lts

FROM zenika/alpine-chrome:with-playwright

USER root
WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma ./prisma/
COPY .env .env

ENV NODE_ENV=production

RUN npm install -g pnpm

RUN pnpm install
RUN pnpm add -P prisma
RUN pnpm prisma:generate

COPY . .

EXPOSE 8080

CMD [ "pnpm", "start" ]
