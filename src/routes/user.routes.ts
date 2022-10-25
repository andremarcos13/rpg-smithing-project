import { Router } from 'express';
import UserController from '../controllers/user.controller';
import ValidateLogin from '../middlewares/login.validate';

const userRouter = Router();
const userController = new UserController();
const validateLoginInfo = new ValidateLogin();

userRouter.post('/users', userController.createNewUser);
userRouter.post('/login', validateLoginInfo.validateUserLogin, userController.login);

export default userRouter;