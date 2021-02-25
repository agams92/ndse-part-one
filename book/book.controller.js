const { MOCK_BOOKS, REQUIRED_FIELDS } = require("../constants");
const { hasOwnProps } = require("../utils");

class BookController {
  getAllBooks(req, res) {
    return res.status(200).json(MOCK_BOOKS);
  }

  getBookById(req, res) {
    const { id } = req.params;
    if (id) {
      const book = MOCK_BOOKS.find((el) => el.id == id);
      return res.status(200).json(book);
    }
    return res.status(404);
  }

  addBook(req, res) {
    if (req.body) {
      const hasAllFields = hasOwnProps(req.body, REQUIRED_FIELDS);
      if (hasAllFields) {
        const newBookId = MOCK_BOOKS.length.toString();
        const newBook = REQUIRED_FIELDS.reduce(
          (book, field) => {
            return { ...book, [field]: req.body[field] };
          },
          { id: newBookId }
        );
        MOCK_BOOKS.push(newBook);
        return res.status(200).json(newBook);
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
      if (bookIndex === -1)
        return res.status(404).json("Sorry, didn't find book with such id");
      const book = MOCK_BOOKS[bookIndex];
      const newBook = { ...book, ...body };
      MOCK_BOOKS[bookIndex] = newBook; // в идеале тут должен быть метод update у модели
      return res.status(200).json(newBook);
    }
    return res.status(404).json("I need book id!");
  }

  deleteBookById(req, res) {
    const { id } = req.params;
    if (id) {
      const bookIndex = MOCK_BOOKS.findIndex((book) => book.id == id);
      if (bookIndex === -1)
        return res.status(404).json("Sorry, didn't find book with such id");
      MOCK_BOOKS.splice(bookIndex, 1);
      return res.status(200).json("ok");
    }
    return res.status(404).json("I need book id!");
  }
}

module.exports = BookController;
