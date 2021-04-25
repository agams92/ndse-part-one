import axios from 'axios';
import { BOOKS_URL } from '../../../constants';
import { errorHandlerRender } from '../../../utils';
import { container } from '../../../infrastructure/container';
import { BooksService } from '../../../services';

const service = container.get(BooksService);

const counterApi = axios.create({ baseURL: 'http://counter:3001' });
class BookRenderController {
  async viewAllBooks(_: any, res: any) {
    try {
      const books = await service.getAllBooks();
      return res.render('books/index', { title: 'Книги', books });
    } catch (e) {
      errorHandlerRender(res)(e);
    }
  }

  async viewBook(req: any, res: any) {
    const { id } = req.params;
    try {
      const book = await service.getBook(id);
      const dataCounter = await counterApi.post(`counter/${id}/incr`);
      const bookViews = dataCounter.data;
      return res.render('books/view', { title: 'Книга', book, bookViews });
    } catch (e) {
      errorHandlerRender(res)(e);
    }
  }

  async addBook(req: any, res: any) {
    const { method, body, file } = req;
    try {
      if (method === 'GET') return res.render('books/create', { title: 'Добавить книгу', book: {} });
      if (method === 'POST') {
        if (file) {
          if (body) {
            const {_id} = await service.create({ ...body, fileBook: file.path });
            return res.redirect(`${BOOKS_URL}/${_id}`);
          }
          return res.status(400).json('Where is request body, Lebovski?');
        }
        return res.status(400).json('Where is book file, Bookovski?');
      }
      return res.render(200).json('ok, boomer');
    } catch (e) {
      errorHandlerRender(res)(e);
    }
  }

  async modifyBook(req: any, res: any) {
    const { method, body, file, params } = req;
    const { id } = params;
    try {
      const book = await service.getBook(id);
      if (method === 'GET') {
        return res.render('books/update', { title: 'Изменить книгу', book });
      }
      if (method === 'POST') {
        if (file) body.fileBook = file.path;
        await service.updateBook(id, body, {new: true});
        return res.redirect(`${BOOKS_URL}/${id}`);
      }
      return res.status(200).json('ok, boomer');
    } catch (e) {
      errorHandlerRender(res)(e)
    }
  }
}

export default BookRenderController;
