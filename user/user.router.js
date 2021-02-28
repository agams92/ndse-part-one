const express = require("express");
const UserController = require("./user.controller");
const userController = new UserController();

const UserRouter = () => {
  const newRouter = express.Router();

  newRouter.route(`/login`).post(userController.login);

  return newRouter;
};

module.exports = UserRouter;
