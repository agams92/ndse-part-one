import express from 'express';
import { fileUpload } from '../../middlewares';
import { BookApiController } from '../../controllers';

const bookApiController = new BookApiController();

const BookApiRouter = () => {
  const newRouter = express.Router();

  newRouter
    .route(`/`)
    .get(bookApiController.getAllBooks)
    .post(fileUpload.single('fileBook'), bookApiController.addBook);

  newRouter
    .route(`/:id`)
    .get(bookApiController.getBookById)
    .put(fileUpload.single('fileBook'), bookApiController.modifyBookById)
    .delete(bookApiController.deleteBookById);

  newRouter.route('/:id/download').get(bookApiController.downloadBook);

  return newRouter;
};

export default BookApiRouter;
