import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import connection from '../models/connection';

export default class ValidateLogin {
  userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public validateUserLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).json(
        { message: '"username" is required' },
      );
    }
    if (!password) {
      return res.status(400).json(
        { message: '"password" is required' },
      );
    }
    const userLogin = await this.userModel.login(username, password);
    if (!userLogin) {
      return res.status(401).json(
        { message: 'Username or password invalid' },
      );
    }
    next();
  };
}