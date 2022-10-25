import express from 'express';
import productRouter from './routes/product.routes';
import userRouter from './routes/user.routes';
import orderRouter from './routes/order.routes';

const app = express();

app.use(express.json());

app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);

export default app;
