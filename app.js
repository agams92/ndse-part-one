const express = require('express');
const { USER_API_URL, BOOKS_API_URL } = require('./app/constants');
const { UserApiRouter, BookApiRouter } = require('./app/api/routers');

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const bookApiRouter = BookApiRouter();
const userApiRouter = UserApiRouter();

server.use(BOOKS_API_URL, bookApiRouter);
server.use(USER_API_URL, userApiRouter);

server.listen(3000);
