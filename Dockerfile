FROM node:latest

WORKDIR /ndse-part-one

COPY app.js ./
COPY ./app ./app
COPY public/books ./
COPY package.json ./

RUN yarn

EXPOSE 3000
CMD ["node", "app.js"]