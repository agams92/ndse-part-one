import express from 'express';
import { fileUpload } from '../../middlewares';
import { BookRenderController } from '../../controllers';

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

export default BookRenderRouter;
