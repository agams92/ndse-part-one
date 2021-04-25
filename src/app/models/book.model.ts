import { Schema, model } from 'mongoose';
import { BOOKS_FILE_PATH } from '../constants';

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

const Book = model('Book', bookSchema);

export default Book;
