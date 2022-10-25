import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/users', userController.createNewUser);

export default userRouter;