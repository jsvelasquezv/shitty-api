# FROM node:lts

FROM zenika/alpine-chrome:with-playwright

USER root
WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

ENV NODE_ENV=production

RUN npm install -g pnpm

RUN pnpm install
# RUN npx playwright install-deps 

COPY . .

EXPOSE 8080

CMD [ "pnpm", "start" ]
