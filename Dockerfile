FROM node:lts-alpine as dev
WORKDIR /code
COPY . .
RUN npm pkg delete scripts.prepare
RUN npm install
RUN npm run build

FROM node:lts-alpine as prod
WORKDIR /code
COPY --from=dev /code/src/infrastructure/webserver/express/documentation ./dist/infrastructure/webserver/express/documentation
COPY --from=dev /code/dist ./dist
COPY package*.json ./
RUN npm pkg delete scripts.prepare
RUN npm ci --omit=dev
EXPOSE 8081
CMD [ "node", "dist/index.js" ]
