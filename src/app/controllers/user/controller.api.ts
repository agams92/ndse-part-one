class UserApiController {
  login(_:any, res:any) {
    res.status(201).json({ id: 1, mail: 'test@mail.ru' });
  }
}

export default UserApiController;
