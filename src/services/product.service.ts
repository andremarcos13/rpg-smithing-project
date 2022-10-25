import ProductModel from '../models/product.model';
import connection from '../models/connection';
import { IProduct } from '../interfaces/interface';

export default class ProductService {
  productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel(connection);
  }

  public async insertProduct(name: string, amount: string): Promise<IProduct> {
    const newProduct = await this.productModel.create(name, amount);
    return newProduct;
  } 
}