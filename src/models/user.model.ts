import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IUser } from '../interfaces/interface';

export default class UserModel {
  connection: Pool;

  constructor(connection:Pool) {
    this.connection = connection;
  }

  public async createUser(
    username: string,
    classe: string,
    level: number,
    password: string,
  ):Promise<IUser> {
    const user = await this.connection
      .execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?,?,?,?)',
      [username, classe, level, password],
    );
    const [data] = user;
    const { insertId } = data;
    return { id: insertId, username, classe, level, password };
  }

  public async login(username: string, password: string):Promise<IUser> {
    const [user] = await this.connection
      .execute(
        'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
        [username, password],
      );
    return (user as RowDataPacket[])[0] as IUser;
  }
}