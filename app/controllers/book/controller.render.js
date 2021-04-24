const axios = require('axios');
const { BOOKS_URL } = require('../../constants');
const { errorHandlerRender } = require('../../utils');
const { Book } = require('../../models');

const counterApi = axios.create({ baseURL: 'http://counter:3001' });
class BookRenderController {
  viewAllBooks(_, res) {
    return Book.find()
      .then((books) => res.render('books/index', { title: 'Книги', books }))
      .catch(errorHandlerRender(res));
  }

  async viewBook(req, res) {
    const { id } = req.params;
    const book = await Book.findById(id);
    try {
      const dataCounter = await counterApi.post(`counter/${id}/incr`);
      const bookViews = dataCounter.data;
      return res.render('books/view', { title: 'Книга', book, bookViews });
    } catch (e) {
      console.log('error');
      console.log(e.message);
      console.log(e.config);
    }
    return res.render('books/view', { title: 'Книга', book });
  }

  addBook(req, res) {
    const { method, body, file } = req;
    if (method === 'GET') return res.render('books/create', { title: 'Добавить книгу', book: {} });
    if (method === 'POST') {
      if (file) {
        if (body) {
          const newBook = new Book({ ...body, fileBook: file.path });
          return newBook.save((err, { _id }) => res.redirect(`${BOOKS_URL}/${_id}`));
        }
        return res.status(400).json('Where is request body, Lebovski?');
      }
      return res.status(400).json('Where is book file, Bookovski?');
    }
    return res.render(200).json('ok, boomer');
  }

  modifyBook(req, res) {
    const { method, body, file, params } = req;
    const { id } = params;
    return Book.findById(id)
      .then((book) => {
        if (method === 'GET') {
          return res.render('books/update', { title: 'Изменить книгу', book });
        }
        if (method === 'POST') {
          if (file) body.fileBook = file.path;
          return book.updateOne(body);
        }
        return res.status(200).json('ok, boomer');
      })
      .then((result) => {
        if (result) {
          return res.redirect(`${BOOKS_URL}/${id}`);
        }
      })
      .catch(errorHandlerRender(res));
  }
}

module.exports = BookRenderController;
