const { NO_BOOK_BY_ID, API_URL, ERROR_ROUTE } = require('../constants');

const hasOwnProps = (targetObj, propsToCheck) => propsToCheck.every((propsName) => targetObj[propsName]);

const createBookIdParamHandler = (Book) => async (req, res, next, id) => {
  try {
    const book = await Book.findById(id);
    if (!book) {
      const isApi = req.baseUrl.includes(API_URL);
      if (isApi) return res.status(404).json(NO_BOOK_BY_ID);
      return res.status(404).redirect(ERROR_ROUTE);
    }
    req.book = book;
    return next();
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const errorHandlerApi = (res) => (e) => {
  console.log(e);
  return res.status(500).json(e);
};

const errorHandlerRender = (res) => (e) => {
  console.log(e);
  return res.status(500).redirect(ERROR_ROUTE);
};

module.exports = { hasOwnProps, createBookIdParamHandler, errorHandlerApi, errorHandlerRender };
