import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Request, Response } from 'express';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('obtém os pedidos corretamente', async function () {
    const findAllStub = sinon.stub(OrderModel, 'findAll');
    const mockOrders = [
      { id: 1, userId: 1, productIds: [1, 2] },
      { id: 2, userId: 2, productIds: [3, 4] },
    ];
    const orderModelInstances = mockOrders.map((order) => OrderModel.build(order));
    await findAllStub.resolves(orderModelInstances);

    const response = await chai.request(app).get('/orders');

    expect(findAllStub.calledOnce).to.be.true;

    expect(response.status).to.equal(200);

    expect(response.body.length).to.equal(2);
    expect(response.body[0].id).to.equal(mockOrders[0].id);
    expect(response.body[0].userId).to.equal(mockOrders[0].userId);
    // expect(response.body[0].productIds).to.deep.equal(mockOrders[0].productIds);
    expect(response.body[1].id).to.equal(mockOrders[1].id);
    // expect(response.body[1].userId).to.equal(mockOrders[1].userId);
    // expect(response.body[1].productIds).to.deep.equal(mockOrders[1].productIds);
  });

});
