import path from 'path';
import { APP_ROOT_PATH } from '../../../constants';
import { errorHandlerApi } from '../../../utils';
import { container } from '../../../infrastructure/container';
import { BooksService } from '../../../services';
import {Request, Response} from '../../../common-types'

const service = container.get(BooksService);
class BookApiController {  
  async getAllBooks(_: Request, res:Response) {
    try {
      const books = await service.getAllBooks();
      return res.status(200).json(books);
    } catch (e) {
      errorHandlerApi(res)(e);
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await service.getBook(id);
      return res.status(200).json(book);
    } catch (e) {
      errorHandlerApi(res)(e);
    }
  }

  async addBook(req: Request, res: Response) {
    try {
      const { body, file } = req;
      if (body) {
        if (file) {
          const bookParams = { ...body, fileBook: file.path };
          const { book } = await service.create(bookParams);
          return res.status(201).json(book);
        }
        return res.status(400).json('Where is book file, Bukovski?');
      }
      return res.status(400).json('Where is request body, Lebovski?');
    } catch (e) {
      errorHandlerApi(res)(e);
    }
  }

  async modifyBookById(req: Request, res: Response) {
    const { body, params } = req;
    const { id } = params;
    if (req.file) body.fileBook = req.file.path;

    try {
      const updatedBook = await service.updateBook(id, body, {
        new: true,
      });
      return res.status(200).json(updatedBook);
    } catch (e) {
      errorHandlerApi(res)(e);
    }
  }

  deleteBookById(req: Request, res: Response) {
    const { id } = req.params;
    return service
      .deleteBook(id)
      .then(() => res.status(200).json('ok'))
      .catch(errorHandlerApi(res));
  }

  async downloadBook(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const book = await service.getBook(id);
      const filePath = path.join(APP_ROOT_PATH, book.fileBook);
      return res.download(filePath, 'book.pdf', (err: any) => {
        if (err) {
          res.status(404).json(err);
        }
      });
    } catch (e) {
      errorHandlerApi(res)(e);
    }
  }
}

export default BookApiController;
