FROM node:16-alpine as base
WORKDIR /
COPY package*.json ./

FROM base as dev

ENV NODE_ENV development
RUN npm install
COPY . .
CMD ["npm", "start"]