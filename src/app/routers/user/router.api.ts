import express from 'express';
import { UserApiController } from '../../controllers';

const userApiController = new UserApiController();

const UserApiRouter = () => {
  const newRouter = express.Router();

  newRouter.route(`/login`).post(userApiController.login);

  return newRouter;
};

export default UserApiRouter;
