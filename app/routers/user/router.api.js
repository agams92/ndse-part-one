const express = require('express');
const { UserApiController } = require('../../controllers');

const userApiController = new UserApiController();

const UserApiRouter = () => {
  const newRouter = express.Router();

  newRouter.route(`/login`).post(userApiController.login);

  return newRouter;
};

module.exports = UserApiRouter;
