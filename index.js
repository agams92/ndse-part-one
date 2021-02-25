const express = require("express");
const { USER_URL, BOOKS_URL } = require("./constants");
const userRouter = require("./user/user.router");
const bookRouter = require("./book/book.router");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

userRouter(USER_URL)(server);
bookRouter(BOOKS_URL)(server);

server.listen(3000);
