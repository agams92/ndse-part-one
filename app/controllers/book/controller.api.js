const path = require('path');
const { APP_ROOT_PATH } = require('../../constants');
const { errorHandlerApi } = require('../../utils');
const { Book } = require('../../models');

class BookApiController {
  async getAllBooks(_, res) {
    return Book.find()
      .then((books) => res.status(200).json(books))
      .catch(errorHandlerApi(res));
  }

  getBookById(req, res) {
    const { id } = req.params;
    return Book.findById(id)
      .then((book) => res.status(200).json(book))
      .catch(errorHandlerApi(res));
  }

  addBook(req, res) {
    const { body, file } = req;
    if (body) {
      if (file) {
        const bookParams = { ...body, fileBook: file.path };
        const newBook = new Book(bookParams);
        return newBook
          .save()
          .then(() => res.status(201).json(newBook))
          .catch(errorHandlerApi(res));
      }
      return res.status(400).json('Where is book file, Bukovski?');
    }
    return res.status(400).json('Where is request body, Lebovski?');
  }

  modifyBookById(req, res) {
    const { body, params } = req;
    const { id } = params;
    if (req.file) body.fileBook = req.file.path;

    return Book.findByIdAndUpdate(id, body, {
      new: true,
    })
      .then((updatedBook) => res.status(200).json(updatedBook))
      .catch(errorHandlerApi(res));
  }

  deleteBookById(req, res) {
    const { book } = req;
    const { id } = book;
    return Book.deleteOne({ _id: id })
      .then(() => res.status(200).json('ok'))
      .catch(errorHandlerApi(res));
  }

  downloadBook(req, res) {
    const { id } = req.params;
    return Book.findById(id)
      .then((book) => {
        const filePath = path.join(APP_ROOT_PATH, book.fileBook);
        return res.download(filePath, 'book.pdf', (err) => {
          if (err) {
            res.status(404).json(err);
          }
        });
      })
      .catch(errorHandlerApi(res));
  }
}

module.exports = BookApiController;
