FROM node:12.16.2 AS builder

WORKDIR /usr/build
RUN npm i npm@latest -g

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run tsc

FROM node:12.16.2-alpine3.11 AS app

WORKDIR /usr/src/app

COPY --from=builder /usr/build/lib .

USER node
CMD [ "node", "index.js" ]
