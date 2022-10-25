import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/products', productController.createNewProduct);
productRouter.get('/products', productController.getAllProducts);
export default productRouter;