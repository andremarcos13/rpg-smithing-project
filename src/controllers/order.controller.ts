import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IPayload } from '../interfaces/interface';
import OrderService from '../services/order.service';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export default class OrderController {
  orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  getAllOrders = async (req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    return res.status(200).json(orders);
  };

  createNewOrder = async (req: Request, res: Response) => {
    const { productsIds } = req.body;
    const token = req.header('Authorization');    
    const payload = jwt.verify(token as string, JWT_SECRET) as IPayload;
    const { userId } = payload;
    await this.orderService.create({ userId, productsIds });    
    return res.status(201).json({ userId, productsIds });
  };
}