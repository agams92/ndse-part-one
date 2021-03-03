const express = require('express');
const { ERROR_ROUTE } = require('../../constants');

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

module.exports = MainRenderRouter;
