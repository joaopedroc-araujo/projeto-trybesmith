import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Request, Response } from 'express';
import createProduct from '../../../src/services/Product.service';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app'; 

chai.use(chaiHttp);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('cria o produto corretamente', async function () {
    const createStub = sinon.stub(ProductModel, 'create');
    const mockProduct = { name: 'Test', price: '100', orderId: 1 };
    req.body = mockProduct;

    const productModelInstance = ProductModel.build(req.body);
    createStub.resolves(productModelInstance);

    const response = await chai.request(app).post('/products').send(mockProduct);

    expect(createStub.calledOnce).to.be.true;
    expect(createStub.calledWith(req.body)).to.be.true;

    expect(response.status).to.equal(201);
  
    expect(response.body.name).to.equal(mockProduct.name);
    expect(response.body.price).to.equal(mockProduct.price);
    expect(response.body.orderId).to.equal(mockProduct.orderId);
  });
});
