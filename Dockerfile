FROM node:23.0.0 AS base

WORKDIR /app

RUN npm i -g yarn --force

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

FROM node:23-alpine3.20 AS release
WORKDIR /app
RUN npm i -g yarn --force

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next
COPY --from=base /app/src ./src
COPY --from=base /app .

EXPOSE 3000

CMD ["yarn", "dev"]