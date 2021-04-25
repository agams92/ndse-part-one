import { NO_BOOK_BY_ID, API_URL, ERROR_ROUTE } from '../constants';

const hasOwnProps = (targetObj:any, propsToCheck:any) => propsToCheck.every((propsName:any) => targetObj[propsName]);

const createBookIdParamHandler = (Book:any) => async (req:any, res:any, next:any, id:any) => {
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

const errorHandlerApi = (res:any) => (e:any) => {
  console.log(e);
  return res.status(500).json(e);
};

const errorHandlerRender = (res:any) => (e:any) => {
  console.log(e);
  return res.status(500).redirect(ERROR_ROUTE);
};

export { hasOwnProps, createBookIdParamHandler, errorHandlerApi, errorHandlerRender };
