FROM node:lts-alpine AS builder
COPY . /code
WORKDIR /code
RUN npm pkg delete scripts.prepare
RUN npm install
RUN npm run build

FROM node:lts-alpine AS production
WORKDIR /code
COPY --from=builder /code/dist ./dist
COPY package*.json ./
RUN npm pkg delete scripts.prepare
RUN npm ci --omit=dev
EXPOSE 8081
CMD [ "node", "dist/index.js" ]
