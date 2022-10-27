import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../interfaces/interface';

export default class ProductModel {
  connection: Pool;

  constructor(connection:Pool) {
    this.connection = connection;
  }

  public async create(name: string, amount: string):Promise<IProduct> {
    const product = await this.connection
      .execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)',
      [name, amount],
    );
    const [{ insertId }] = product;
    return { id: insertId, name, amount };
  }

  public async getAll():Promise<IProduct[]> {
    const [products] = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    return products as IProduct[];
  }

  public async update(productId: number, orderId: number) {
    await this.connection
      .execute(
        'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
        [orderId, productId],
      );
  }
}