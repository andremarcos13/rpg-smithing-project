import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { IToken, IUser } from '../interfaces/interface';
import connection from '../models/connection';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

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

  public async login(username: string, password: string):Promise<IToken> {
    const userLogin = await this.userModel.login(username, password);
    // const jwtconfig = {
    //   expiresIn: '1d',
    //   algorithm: 'HS256',
    // };
    const token = jwt.sign(
      { userId: userLogin.id }, 
      JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '1d' },
    );
    // https://stackoverflow.com/questions/53813188/how-can-i-cast-custom-type-to-primitive-type
    // Conversion of type 'string' to type 'IToken' may be a mistake because 
    // neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.ts(2352)
    return token as unknown as IToken;
  }
}