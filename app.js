const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const { USER_API_URL, BOOKS_API_URL, BOOKS_URL } = require('./app/constants');
const { UserApiRouter, BookApiRouter, BookRenderRouter, MainRenderRouter } = require('./app/routers');

const server = express();

server.set('views', path.join(__dirname, 'app/views'));
server.set('view engine', 'ejs');
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const bookApiRouter = BookApiRouter();
const userApiRouter = UserApiRouter();
const bookRenderRouter = BookRenderRouter();
const mainRenderRouter = MainRenderRouter();

server.use('/', mainRenderRouter);
server.use(BOOKS_API_URL, bookApiRouter);
server.use(USER_API_URL, userApiRouter);
server.use(BOOKS_URL, bookRenderRouter);

server.listen(PORT, () => console.log(`> app is ready on port:${PORT} hehe`));
