import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import ValidateOrder from '../middlewares/order.validate';
import ValidateToken from '../middlewares/token.validate';

const orderRouter = Router();
const orderController = new OrderController();
const validateOrder = new ValidateOrder();
const validateToken = new ValidateToken();

orderRouter.get('/orders', orderController.getAllOrders);
orderRouter.post(
  '/orders', 
  validateToken.checkToken, 
  validateOrder.validateOrderId, 
  orderController.createNewOrder,
);

export default orderRouter;