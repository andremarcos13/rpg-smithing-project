import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProductController {
  productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }
  
  createNewProduct = async (req: Request, res: Response) => {
    const { name, amount } = req.body;

    const newProduct = await this.productService.insertProduct(name, amount); 
    return res.status(201).json(newProduct);
  };

  getAllProducts = async (req: Request, res: Response) => {
    const products = await this.productService.getllAllProducts();
    return res.status(200).json(products);
  };
}