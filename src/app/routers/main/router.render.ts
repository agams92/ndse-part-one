import express from 'express';
import { ERROR_ROUTE } from '../../constants';

const MainRenderRouter = () => {
  const newRouter = express.Router();

  newRouter.route(`/`).get((_, res) =>
    res.render('main', {
      title: 'Главная',
    }),
  );

  newRouter.route(ERROR_ROUTE).get((_, res) => res.render('error/404', { title: 'Ошипка!' }));

  return newRouter;
};

export default MainRenderRouter;
