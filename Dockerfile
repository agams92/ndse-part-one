FROM node:latest

WORKDIR /ndse-part-one

COPY package.json ./
RUN yarn

COPY app.js ./
COPY ./app ./app
COPY public/books ./public/books

EXPOSE 3000 3001
CMD ["node", "app.js"]