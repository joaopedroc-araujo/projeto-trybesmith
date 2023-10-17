import { Product } from '../types/Product';
import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';

const createProduct = async (product: Product): Promise<Product> => {
  const newProductModel: ProductSequelizeModel = await ProductModel.create(product);
  const newProduct = newProductModel.toJSON() as Product;
  return newProduct;
};

export default createProduct;