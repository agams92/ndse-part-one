const path = require('path');
const { REQUIRED_FIELDS, APP_ROOT_PATH } = require('../../constants');
const { hasOwnProps, createBookIdParamHandler } = require('../../utils');
const { Book, MOCK_BOOKS } = require('../../models');

class BookApiController {
  handleIdParam(req, res, next, id) {
    return createBookIdParamHandler(MOCK_BOOKS)(req, res, next, id);
  }

  getAllBooks(_, res) {
    const booksToReturn = MOCK_BOOKS || [];
    return res.status(200).json(booksToReturn);
  }

  getBookById(req, res) {
    const { book } = req;
    return res.status(200).json(book);
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
    const { book, bookIndex, body } = req;
    const newBook = { ...book, ...body };
    if (req.file) newBook.fileBook = req.file.path;
    MOCK_BOOKS[bookIndex] = newBook;
    return res.status(200).json(newBook);
  }

  deleteBookById(req, res) {
    const { bookIndex } = req;
    MOCK_BOOKS.splice(bookIndex, 1);
    return res.status(200).json('ok');
  }

  downloadBook(req, res) {
    const { book } = req;
    const filePath = path.join(APP_ROOT_PATH, book.fileBook);
    return res.download(filePath, 'book.pdf', (err) => {
      if (err) {
        res.status(404).json(err);
      }
    });
  }
}

module.exports = BookApiController;
