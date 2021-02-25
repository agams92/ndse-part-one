const BookController = require("./book.controller");
const bookController = new BookController();

const bookRouter = (baseUrl) => (server) => {
  server
    .route(`${baseUrl}/`)
    .get(bookController.getAllBooks)
    .post(bookController.addBook);

  server
    .route(`${baseUrl}/:id`)
    .get(bookController.getBookById)
    .put(bookController.modifyBookById)
    .delete(bookController.deleteBookById);
};

module.exports = bookRouter;
