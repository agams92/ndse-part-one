const express = require("express");
const { fileUpload } = require("../middlewares");
const BookController = require("./book.controller");
const bookController = new BookController();

const BookRouter = () => {
  const newRouter = express.Router();

  newRouter
    .route(`/`)
    .get(bookController.getAllBooks)
    .post(fileUpload.single("fileBook"), bookController.addBook);

  newRouter
    .route(`/:id`)
    .get(bookController.getBookById)
    .put(fileUpload.single("fileBook"), bookController.modifyBookById)
    .delete(bookController.deleteBookById);

  newRouter.route("/:id/download").get(bookController.downloadBook);

  return newRouter;
};

module.exports = BookRouter;
