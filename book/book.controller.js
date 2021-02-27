const {
  MOCK_BOOKS,
  REQUIRED_FIELDS,
  NO_BOOK_BY_ID,
  NO_BOOK_ID,
} = require("../constants");
const { hasOwnProps } = require("../utils");

class BookController {
  getAllBooks(req, res) {
    const booksToReturn = MOCK_BOOKS || [];
    return res.status(200).json(booksToReturn);
  }

  getBookById(req, res) {
    const { id } = req.params;
    if (id) {
      const book = MOCK_BOOKS.find((el) => el.id == id);
      if (book) return res.status(200).json(book);
      return res.status(404).json(NO_BOOK_BY_ID);
    }
    return res.status(404).json(NO_BOOK_ID);
  }

  addBook(req, res) {
    if (req.body) {
      const hasAllFields = hasOwnProps(req.body, REQUIRED_FIELDS);
      if (hasAllFields) {
        const sortedBooksIds = MOCK_BOOKS.map((bk) => bk.id).sort(
          (a, b) => a - b
        );
        const largestId = sortedBooksIds[sortedBooksIds.length - 1];
        const newBookId = largestId + 1;
        const newBook = REQUIRED_FIELDS.reduce(
          (book, field) => {
            return { ...book, [field]: req.body[field] };
          },
          { id: newBookId }
        );
        MOCK_BOOKS.push(newBook);
        return res.status(201).json(newBook);
      }
      return res.status(400).json("Some field are missing in request");
    }
    return res.status(400).json("Where is request body, Lebovski?");
  }

  modifyBookById(req, res) {
    const { params, body } = req;
    const { id } = params;
    if (id) {
      const bookIndex = MOCK_BOOKS.findIndex((book) => book.id == id);
      if (bookIndex === -1) return res.status(404).json(NO_BOOK_BY_ID);
      const book = MOCK_BOOKS[bookIndex];
      const newBook = { ...book, ...body };
      MOCK_BOOKS[bookIndex] = newBook; // в идеале тут должен быть метод update у модели
      return res.status(200).json(newBook);
    }
    return res.status(404).json(NO_BOOK_ID);
  }

  deleteBookById(req, res) {
    const { id } = req.params;
    if (id) {
      const bookIndex = MOCK_BOOKS.findIndex((book) => book.id == id);
      if (bookIndex === -1) return res.status(404).json(NO_BOOK_BY_ID);
      MOCK_BOOKS.splice(bookIndex, 1);
      return res.status(200).json("ok");
    }
    return res.status(404).json(NO_BOOK_ID);
  }
}

module.exports = BookController;
