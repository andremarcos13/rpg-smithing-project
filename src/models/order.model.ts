import { Pool, ResultSetHeader } from 'mysql2/promise';
import { INewOrder, IOrder } from '../interfaces/interface';

export default class OrderModel {
  connection: Pool;
    
  constructor(connection:Pool) {
    this.connection = connection;
  }

  public async getAllOrders():Promise<IOrder[]> {
    const [orders] = await this.connection
      .execute(`
      SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds
         FROM Trybesmith.Orders as o
        INNER JOIN 
      Trybesmith.Products AS p
    ON o.id = p.orderId
    GROUP BY o.id
    ORDER BY o.userId
  `);
    return orders as IOrder[];
  }

  public async create(order: INewOrder) {
    const [{ insertId }] = await this.connection
      .execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [order.userId],
    );
    console.log('model', insertId);
    
    return insertId;
  }
}