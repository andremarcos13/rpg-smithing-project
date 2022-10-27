import connection from '../models/connection';
import OrderModel from '../models/order.model';
import { INewOrder, IOrder } from '../interfaces/interface';
import ProductService from './product.service';

export default class OrderService {
  orderModel: OrderModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
  }

  public async getAll():Promise<IOrder[]> {
    const orders = await this.orderModel.getAllOrders();
    return orders;
  }

  public async create(order: INewOrder) {
    const getOrderId = await this.orderModel.create(order);
    const productService = new ProductService();
    await Promise.all(order.productsIds.map(async (elem) => {
      await productService.updateProduct(elem, getOrderId);
    }));
    console.log('create service', getOrderId);
    
    return getOrderId;
  }
}