const path = require('path');
const { REQUIRED_FIELDS, NO_BOOK_BY_ID, NO_BOOK_ID, APP_ROOT_PATH } = require('../../constants');
const { hasOwnProps } = require('../../utils');
const { Book } = require('../../models');

const MOCK_BOOKS = [1, 2, 3].map((el) => {
  return new Book({ title: `book ${el}`, description: `description ${el}` });
});

class BookController {
  getAllBooks(_, res) {
    const booksToReturn = MOCK_BOOKS || [];
    return res.status(200).json(booksToReturn);
  }

  getBookById(req, res) {
    const { id } = req.params;
    if (id) {
      const book = MOCK_BOOKS.find((el) => el.id == id);
      if (book) return res.status(200).json(book);
      return res.status(404).json(NO_BOOK_BY_ID);
    }
    return res.status(404).json(NO_BOOK_ID);
  }

  addBook(req, res) {
    const { body, file } = req;
    if (body) {
      if (file) {
        const hasAllFields = hasOwnProps(body, REQUIRED_FIELDS);
        if (hasAllFields) {
          const bookParams = { ...body, fileBook: file.path };
          const newBook = new Book(bookParams);
          MOCK_BOOKS.push(newBook);
          return res.status(201).json(newBook);
        }
        return res.status(400).json('Some field are missing in request');
      }
      return res.status(400).json('Where is book file, Bukovski?');
    }
    return res.status(400).json('Where is request body, Lebovski?');
  }

  modifyBookById(req, res) {
    const { params, body } = req;
    const { id } = params;
    if (id) {
      const bookIndex = MOCK_BOOKS.findIndex((book) => book.id == id);
      if (bookIndex === -1) return res.status(404).json(NO_BOOK_BY_ID);

      const book = MOCK_BOOKS[bookIndex];
      const newBook = { ...book, ...body };
      if (req.file) {
        newBook.fileBook = req.file.path;
      }
      MOCK_BOOKS[bookIndex] = newBook; // в идеале тут должен быть метод update у модели
      return res.status(200).json(newBook);
    }
    return res.status(404).json(NO_BOOK_ID);
  }

  deleteBookById(req, res) {
    const { id } = req.params;
    if (id) {
      const bookIndex = MOCK_BOOKS.findIndex((book) => book.id == id);
      if (bookIndex === -1) return res.status(404).json(NO_BOOK_BY_ID);
      MOCK_BOOKS.splice(bookIndex, 1);
      return res.status(200).json('ok');
    }
    return res.status(404).json(NO_BOOK_ID);
  }

  downloadBook(req, res) {
    const { id } = req.params;
    const bookIndex = MOCK_BOOKS.findIndex((book) => book.id == id);
    if (bookIndex === -1) return res.status(404).json(NO_BOOK_BY_ID);

    const book = MOCK_BOOKS[bookIndex];
    const filePath = path.join(APP_ROOT_PATH, book.fileBook);
    return res.download(filePath, 'book.pdf', (err) => {
      if (err) {
        res.status(404).json(err);
      }
    });
  }
}

module.exports = BookController;
