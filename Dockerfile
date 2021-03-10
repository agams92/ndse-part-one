FROM node:latest

WORKDIR /ndse-part-one

COPY app.js ./
COPY ./app ./app
COPY public/books ./public/books
COPY package.json ./

RUN yarn

EXPOSE 3000 3001
CMD ["node", "app.js"]