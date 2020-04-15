FROM node:12.16.2-alpine3.11 AS builder

WORKDIR /usr/build
RUN npm i npm@latest -g

COPY . /usr/build
RUN npm install && npm run tsc && npm cache clean --force

FROM node:12.16.2-alpine3.11 AS app

WORKDIR /usr/src/app

USER node
COPY --from=builder /usr/build/node_modules ./node_modules
COPY --from=builder /usr/build/lib .

CMD [ "node", "index.js" ]
