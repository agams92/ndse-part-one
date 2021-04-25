import path from 'path';
import { APP_ROOT_PATH } from '../../constants';
import { errorHandlerApi } from '../../utils';
import { Book } from '../../models';

class BookApiController {
  async getAllBooks(_:any, res:any) {
    return Book.find()
      .then((books:any) => res.status(200).json(books))
      .catch(errorHandlerApi(res));
  }

  getBookById(req:any, res:any) {
    const { id } = req.params;
    return Book.findById(id)
      .then((book:any) => res.status(200).json(book))
      .catch(errorHandlerApi(res));
  }

  addBook(req:any, res:any) {
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

  modifyBookById(req:any, res:any) {
    const { body, params } = req;
    const { id } = params;
    if (req.file) body.fileBook = req.file.path;

    return Book.findByIdAndUpdate(id, body, {
      new: true,
    })
      .then((updatedBook:any) => res.status(200).json(updatedBook))
      .catch(errorHandlerApi(res));
  }

  deleteBookById(req:any, res:any) {
    const { book } = req;
    const { id } = book;
    return Book.deleteOne({ _id: id })
      .then(() => res.status(200).json('ok'))
      .catch(errorHandlerApi(res));
  }

  downloadBook(req:any, res:any) {
    const { id } = req.params;
    return Book.findById(id)
      .then((book:any) => {
        const filePath = path.join(APP_ROOT_PATH, book.fileBook);
        return res.download(filePath, 'book.pdf', (err:any) => {
          if (err) {
            res.status(404).json(err);
          }
        });
      })
      .catch(errorHandlerApi(res));
  }
}

export default BookApiController;
