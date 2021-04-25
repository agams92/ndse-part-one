import axios from 'axios';
import { BOOKS_URL } from '../../constants';
import { errorHandlerRender } from '../../utils';
import { Book } from '../../models';

const counterApi = axios.create({ baseURL: 'http://counter:3001' });
class BookRenderController {
  viewAllBooks(_:any, res:any) {
    return Book.find()
      .then((books:any) => res.render('books/index', { title: 'Книги', books }))
      .catch(errorHandlerRender(res));
  }

  async viewBook(req:any, res:any) {
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

  addBook(req:any, res:any) {
    const { method, body, file } = req;
    if (method === 'GET') return res.render('books/create', { title: 'Добавить книгу', book: {} });
    if (method === 'POST') {
      if (file) {
        if (body) {
          const newBook = new Book({ ...body, fileBook: file.path });
          return newBook.save((err:any, { _id }:any) => res.redirect(`${BOOKS_URL}/${_id}`));
        }
        return res.status(400).json('Where is request body, Lebovski?');
      }
      return res.status(400).json('Where is book file, Bookovski?');
    }
    return res.render(200).json('ok, boomer');
  }

  modifyBook(req:any, res:any) {
    const { method, body, file, params } = req;
    const { id } = params;
    return Book.findById(id)
      .then((book:any) => {
        if (method === 'GET') {
          return res.render('books/update', { title: 'Изменить книгу', book });
        }
        if (method === 'POST') {
          if (file) body.fileBook = file.path;
          return book.updateOne(body);
        }
        return res.status(200).json('ok, boomer');
      })
      .then((result:any) => {
        if (result) {
          return res.redirect(`${BOOKS_URL}/${id}`);
        }
      })
      .catch(errorHandlerRender(res));
  }
}

export default BookRenderController;
