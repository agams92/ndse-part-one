import BookModel from './book.model';
import { IBook } from './books.types';

interface CreateBookDto {
  title: IBook['title'];
  description: IBook['description'];
  authors: IBook['authors'];
  favourite: IBook['favourite'];
  fileCover: IBook['fileCover'];
  fileName: IBook['fileName'];
  fileBook: IBook['fileBook'];
}

interface UpdateBookDto {
  title?: IBook['title'];
  description?: IBook['description'];
  authors?: IBook['authors'];
  favourite?: IBook['favourite'];
  fileCover?: IBook['fileCover'];
  fileName?: IBook['fileName'];
  fileBook?: IBook['fileBook'];
}

export default class BooksService {
  async create(data: CreateBookDto): Promise<{book: IBook, _id: number}> {
    const book = new BookModel(data);
    await book.save();
    const { _id } = book;
    return { book, _id };
  }

  getAllBooks(): Promise<IBook[]> {
    return BookModel.find().exec();
  }

  getBook(id: number): Promise<IBook> {
    return BookModel.findById(id).exec();
  }

  updateBook(id: number, newData: UpdateBookDto, options: { new: boolean }): Promise<IBook> {
    return BookModel.findByIdAndUpdate(id, newData, options).exec();
  }

  deleteBook(id: number): Promise<{ ok?: number }> {
    return BookModel.deleteOne({ _id: id }).exec();
  }
}
