import { Schema, model, Document } from 'mongoose';
import { BOOKS_FILE_PATH } from '../../constants';
import { IBook } from './books.types';

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  authors: {
    type: String,
    default: '',
  },
  favourite: {
    type: String,
    default: '',
  },
  fileCover: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
  fileBook: {
    type: String,
    default: `${BOOKS_FILE_PATH}/book.pdf`,
  },
});

const BookModel = model<IBook & Document>('Book', bookSchema);

export default BookModel;
