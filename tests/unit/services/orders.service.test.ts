import { expect } from 'chai';
import sinon from 'sinon';
import OrderService from '../../../src/services/Order.service';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';

describe('OrderService', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('obtém os pedidos corretamente', async function () {
    const findAllStub = sinon.stub(OrderModel, 'findAll');

    const order1 = { id: 1, userId: 1, productIds: [1, 2] };
    const order2 = { id: 2, userId: 2, productIds: [3, 4] };
    const orderModelInstances = [OrderModel.build(order1), OrderModel.build(order2)];
    findAllStub.resolves(orderModelInstances);

    const result = await OrderService.getOrders();

    expect(findAllStub.calledOnce).to.be.true;

    expect(result.length).to.equal(2);
    expect(result[0].id).to.equal(order1.id);
    expect(result[0].userId).to.equal(order1.userId);
  //   expect(result[0].productIds).to.deep.equal(order1.productIds);
    expect(result[1].id).to.equal(order2.id);
    expect(result[1].userId).to.equal(order2.userId);
  //   expect(result[1].productIds).to.deep.equal(order2.productIds);
  });

});
