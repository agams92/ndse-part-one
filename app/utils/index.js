const { NO_BOOK_BY_ID, API_URL, ERROR_ROUTE } = require('../constants');

const hasOwnProps = (targetObj, propsToCheck) => propsToCheck.every((propsName) => targetObj[propsName]);

const createBookIdParamHandler = (bookArray) => (req, res, next, id) => {
  const bookIndex = bookArray.findIndex((book) => book.id === Number(id));
  if (bookIndex === -1) {
    const isApi = req.baseUrl.includes(API_URL);
    if (isApi) return res.status(404).json(NO_BOOK_BY_ID);
    return res.status(404).redirect(ERROR_ROUTE);
  }
  const book = bookArray[bookIndex];
  req.book = book;
  req.bookIndex = bookIndex;
  return next();
};

module.exports = { hasOwnProps, createBookIdParamHandler };
