const User = require('./user.model');
const Book = require('./book.model.ts');

const initializeDB = async () => {
  const booksInitCount = [1, 2, 3];
  for await (const el of booksInitCount) {
    try {
      const filter = { title: `Title ${el}` };
      const book = await Book.findOne(filter);
      if (!book) {
        const newBook = new Book(filter);
        await newBook.save();
      }
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = { User, Book, initializeDB };
