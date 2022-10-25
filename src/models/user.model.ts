import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IUser } from '../interfaces/interface';

export default class UserModel {
  connection: Pool;

  constructor(connection:Pool) {
    this.connection = connection;
  }

  public async createUser(username: string,
    classe: string
    level: number,
    password: string,)
}