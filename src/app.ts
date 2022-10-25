import express from 'express';
import productRouter from './routes/product.routes';
import userRouter from './routes/user.routes';

const app = express();

app.use(express.json());

app.use(productRouter);
app.use(userRouter);

export default app;
