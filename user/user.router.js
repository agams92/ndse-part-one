const UserController = require("./user.controller");
const userController = new UserController();

const userRouter = (baseUrl) => (server) => {
  server.route(`${baseUrl}/login`).post(userController.login);
};

module.exports = userRouter;
