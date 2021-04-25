import express from 'express';
import {Request, Response} from '../../../common-types'

const UserApiRouter = () => {
  const newRouter = express.Router();

  newRouter.route(`/login`).post((_:Request, res:Response) => {
    return res.status(201).json({ id: 1, mail: 'test@mail.ru' });
  });

  return newRouter;
};

export default UserApiRouter;
