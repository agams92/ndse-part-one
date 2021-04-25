import express from 'express';

const UserApiRouter = () => {
  const newRouter = express.Router();

  newRouter.route(`/login`).post((_:any, res:any) => {
    return res.status(201).json({ id: 1, mail: 'test@mail.ru' });
  });

  return newRouter;
};

export default UserApiRouter;
