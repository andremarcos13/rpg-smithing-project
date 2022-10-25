import connection from '../models/connection';
import OrderModel from '../models/order.model';
import { IOrder } from '../interfaces/interface';

export default class OrderService {
  orderModel: OrderModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
  }

  public async getAll():Promise<IOrder[]> {
    const orders = await this.orderModel.getAllOrders();
    return orders;
  }
}