FROM node:lts-alpine3.14 as builder

RUN mkdir -p /usr/app/node_modules && chown -R node:node  /usr/app

WORKDIR /usr/app

COPY package*.json ./

RUN npm config set unsafe-perm true

COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node types ./types

USER node

COPY --chown=node:node . .

RUN npm install
RUN npm run build

#----- Staging
FROM node:lts-alpine3.14 as stager
RUN mkdir -p /usr/app/node_modules && chown -R node:node  /usr/app

WORKDIR /usr/app

RUN apk add --no-cache dos2unix
COPY --chown=node:node package*.json ./
RUN apk add --no-cache --virtual .build-deps make gcc g++ python2 && \
  npm install --only=prod && \
  apk del .build-deps


COPY --chown=node:node entrypoint.sh ./
COPY --chown=node:node entrypoint_worker.sh ./
COPY --chown=node:node prisma ./prisma

USER node

RUN dos2unix ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

RUN dos2unix ./entrypoint_worker.sh

RUN chmod +x ./entrypoint_worker.sh


#----- Production
FROM node:lts-alpine3.14 as prod
RUN mkdir -p /usr/app/node_modules && chown -R node:node  /usr/app

WORKDIR /usr/app

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PORT 5000
ENV NODE_ENV=production

COPY --chown=node:node --from=stager /usr/app/package*.json ./
COPY --chown=node:node --from=stager /usr/app/entrypoint.sh ./
COPY --chown=node:node --from=stager /usr/app/entrypoint_worker.sh ./
COPY --chown=node:node --from=builder /usr/app/dist ./dist
COPY --chown=node:node --from=stager /usr/app/node_modules ./node_modules
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node ecosystem.config.js ./


RUN npm install pm2 -g

USER node

EXPOSE 5000

CMD ["npm", "run", "start"]
