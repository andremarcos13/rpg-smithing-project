import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get('/orders', orderController.getAllOrders);

export default orderRouter;