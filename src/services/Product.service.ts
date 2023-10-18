import { Product } from '../types/Product';
import ProductModel, {
  ProductSequelizeModel, 
} from '../database/models/product.model';

interface ProductService {
  getProducts: () => Promise<Product[]>;
  createProduct: (product: Product) => Promise<Product>;
}

const getProducts: ProductService['getProducts'] = async () => {
  const products: ProductSequelizeModel[] = await ProductModel.findAll();
  return products.map((product) => product.toJSON() as Product);
};

const createProduct: ProductService['createProduct'] = async (product) => {
  const newProductModel: ProductSequelizeModel = await ProductModel.create(product);
  const newProduct = newProductModel.toJSON() as Product;
  return newProduct;
};

export default {
  getProducts,
  createProduct,
};
