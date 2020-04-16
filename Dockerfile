FROM node:12.16.2-alpine3.11 AS builder

WORKDIR /usr/build
RUN npm i npm@latest -g

COPY package.json /usr/build
RUN npm install && npm cache clean --force

FROM node:12.16.2-alpine3.11 AS app

WORKDIR /usr/src/app

USER node
COPY --from=builder /usr/build/node_modules ./node_modules
RUN npm run tsc

CMD [ "node", "lib/index.js" ]
