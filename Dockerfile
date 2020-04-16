FROM node:12.16.2-alpine3.11 AS builder

WORKDIR /usr/build
RUN npm i npm@latest -g

COPY package.json /usr/build
RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install \
    && npm install node-gyp \
    && npm cache clean --force \
    && apk del .gyp

FROM node:12.16.2-alpine3.11 AS app

WORKDIR /usr/src/app

COPY --from=builder /usr/build/node_modules ./node_modules
COPY *.json ./
COPY src ./src
RUN npm run tsc

USER node
CMD [ "node", "lib/index.js" ]
