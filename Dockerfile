# Development stage
FROM node:latest as base

WORKDIR /ndse-part-one

COPY package.json ./
RUN yarn

COPY ./src/ ./src/
COPY ./public/ ./public/
COPY ./tsconfig.json ./
COPY ./nodemon.json ./

# Production stage

FROM base as production

ENV NODE_PATH=./build

RUN npm run build