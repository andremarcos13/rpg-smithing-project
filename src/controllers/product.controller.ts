import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class ProcutController {
  productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }
  
  createNewProduct = async (req: Request, res: Response) => {
    const { name, amount } = req.body;

    const newProduct = await this.productService.insertProduct(name, amount); 
    return res.status(201).json(newProduct);
  };
}