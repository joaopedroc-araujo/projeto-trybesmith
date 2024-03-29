import { Order } from '../types/Order';
import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
// import { Product } from '../types/Product';

interface OrderService {
  getOrders: () => Promise<Order[]>;
  createOrder: (order: Order) => Promise<Order>;
}

interface DatabaseProduct {
  id: number;
}

const getOrders: OrderService['getOrders'] = async () => {
  const orders = await OrderModel.findAll({
    include: [{
      model: ProductModel,
      as: 'productIds',
    }],
  });
  
  return orders.map((order) => {
    const rawOrder = order.get({ plain: true });
    return {
      id: rawOrder.id,
      userId: rawOrder.userId,
      productIds: rawOrder.productIds ? (rawOrder.productIds as unknown as DatabaseProduct[])
        .map((product) => product.id) : [],
    };
  });
};

export default {
  getOrders,
};
