FROM node:latest

WORKDIR /ndse-part-one

COPY package.json ./
RUN yarn
COPY app.ts ./
COPY ./app ./app
COPY tsconfig.json ./
COPY public/books ./public/books

EXPOSE 3000 3001
CMD ["node", "app.ts"]