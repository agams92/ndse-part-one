const express = require('express');

const MainRenderRouter = () => {
  const newRouter = express.Router();

  newRouter.route(`/`).get((_, res) =>
    res.render('index', {
      title: 'Главная',
    }),
  );

  return newRouter;
};

module.exports = MainRenderRouter;
