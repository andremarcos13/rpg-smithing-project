import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  userService: UserService;
    
  constructor() {
    this.userService = new UserService();
  }

  createNewUser = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    const token = await this.userService.createUser(username, classe, level, password);
    return res.status(201).json({ token });
  };
}
