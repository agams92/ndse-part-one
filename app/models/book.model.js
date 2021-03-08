const { default: ShortUniqueId } = require('short-unique-id');
const { BOOKS_FILE_PATH } = require('../constants');

const uid = new ShortUniqueId({
  dictionary: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  length: 8,
});

class Book {
  constructor({
    id = Number(uid()),
    title = 'title',
    description = 'description',
    authors = 'authors',
    favourite = 'favourite',
    fileCover = 'fileCover',
    fileName = 'fileName',
    fileBook = `${BOOKS_FILE_PATH}/book.pdf`,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favourite = favourite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  }
}

const MOCK_BOOKS = [1, 2, 3].map((el) => new Book({ id: el, title: `book ${el}`, description: `description ${el}` }));
module.exports = { Book, MOCK_BOOKS };
