import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { IToken, IUser } from '../interfaces/interface';
import connection from '../models/connection';

dotenv.config();
// const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const generateToken = async (user: Omit<IUser, 'password'>) => 
  jwt.sign(user, process.env.JWT_SECRET as Secret);

export default class UserService {
  userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async createUser( 
    username: string,
    classe: string,
    level: number,
    password: string,
  ):Promise<IToken> {
    await this.userModel.createUser(username, classe, level, password);
    const token = await generateToken({ username, classe, level });    
    return { token };
  }
}