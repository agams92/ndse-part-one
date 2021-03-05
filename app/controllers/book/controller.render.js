const { BOOKS_URL, REQUIRED_FIELDS } = require('../../constants');
const { hasOwnProps, createBookIdParamHandler } = require('../../utils');
const { Book, MOCK_BOOKS } = require('../../models');

class BookRenderController {
  handleIdParam(req, res, next, id) {
    return createBookIdParamHandler(MOCK_BOOKS)(req, res, next, id);
  }

  viewAllBooks(_, res) {
    return res.render('books/index', { title: 'Книги', books: MOCK_BOOKS });
  }

  viewBook(req, res) {
    const { book } = req;
    return res.render('books/view', { title: 'Книга', book });
  }

  addBook(req, res) {
    const { method, body, file } = req;
    if (method === 'GET') return res.render('books/create', { title: 'Добавить книгу', book: {} });
    if (method === 'POST') {
      if (file) {
        if (body) {
          const hasAllFields = hasOwnProps(body, REQUIRED_FIELDS);
          if (hasAllFields) {
            const newBook = new Book(body);
            const { id } = newBook;
            MOCK_BOOKS.push(newBook);
            return res.redirect(`${BOOKS_URL}/${id}`);
          }
          return res.status(400).json('Some field are missing in request');
        }
        return res.status(400).json('Where is request body, Lebovski?');
      }
      return res.status(400).json('Where is book file, Bookovski?');
    }
    return res.render(200).json('ok, boomer');
  }

  modifyBook(req, res) {
    const { method, body, book, bookIndex, file } = req;
    if (method === 'GET') return res.render('books/update', { title: 'Изменить книгу', book });
    if (method === 'POST') {
      const newBook = { ...book, ...body };
      if (file) newBook.fileBook = file.path;
      const { id } = newBook;
      MOCK_BOOKS[bookIndex] = newBook;
      return res.redirect(`${BOOKS_URL}/${id}`);
    }
    return res.status(200).json('ok, boomer');
  }
}

module.exports = BookRenderController;
