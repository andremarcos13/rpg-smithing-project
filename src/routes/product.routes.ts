import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import ValidateProduct from '../middlewares/product.validate';

const productRouter = Router();
const productController = new ProductController();
const validateProductInfo = new ValidateProduct();

productRouter.post(
  '/products', 
  validateProductInfo.validateProductAmount, 
  validateProductInfo.validateProductName,
  productController.createNewProduct,
);
productRouter.get('/products', productController.getAllProducts);
export default productRouter;