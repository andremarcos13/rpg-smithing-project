import { Router } from 'express';
import UserController from '../controllers/user.controller';
import ValidateLogin from '../middlewares/login.validate';
import ValidateUser from '../middlewares/user.validate';

const userRouter = Router();
const userController = new UserController();
const validateLoginInfo = new ValidateLogin();
const validateUserInfo = new ValidateUser();

userRouter.post(
  '/users', 
  validateUserInfo.validateUserClasse,
  validateUserInfo.validateUserLevel,
  validateUserInfo.validateUserName,
  validateUserInfo.validateUserPassword, 
  userController.createNewUser,
);
userRouter.post('/login', validateLoginInfo.validateUserLogin, userController.login);

export default userRouter;