const express = require("express");
const { USER_API_URL, BOOKS_API_URL } = require("./app/constants");
const { UserRouter, BookRouter } = require("./app/routers");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const bookRouter = BookRouter();
const userRouter = UserRouter();

server.use(BOOKS_API_URL, bookRouter);
server.use(USER_API_URL, userRouter);

server.listen(3000);
