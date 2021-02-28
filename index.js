const express = require("express");
const { USER_URL, BOOKS_URL } = require("./constants");
const UserRouter = require("./user/user.router");
const BookRouter = require("./book/book.router");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const bookRouter = BookRouter();
const userRouter = UserRouter();

server.use(BOOKS_URL, bookRouter);
server.use(USER_URL, userRouter);

server.listen(3000);
