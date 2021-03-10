const express = require('express');
const { fileUpload } = require('../../middlewares');
const { BookRenderController } = require('../../controllers');

const bookRenderController = new BookRenderController();

const BookRenderRouter = () => {
  const newRouter = express.Router();

  newRouter.route(`/`).get(bookRenderController.viewAllBooks);
  newRouter
    .route('/create')
    .get(bookRenderController.addBook)
    .post(fileUpload.single('fileBook'), bookRenderController.addBook);

  newRouter.route('/:id').get(bookRenderController.viewBook);
  newRouter
    .route('/update/:id')
    .get(bookRenderController.modifyBook)
    .post(fileUpload.single('fileBook'), bookRenderController.modifyBook);

  return newRouter;
};

module.exports = BookRenderRouter;
