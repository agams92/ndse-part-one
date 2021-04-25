import { ERROR_ROUTE } from '../constants';

const errorHandlerApi = (res:any) => (e:any) => {
  console.log(e);
  return res.status(500).json(e);
};

const errorHandlerRender = (res:any) => (e:any) => {
  console.log(e);
  return res.status(500).redirect(ERROR_ROUTE);
};

export { errorHandlerApi, errorHandlerRender };
