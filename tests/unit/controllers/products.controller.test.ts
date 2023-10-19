import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Request, Response, NextFunction } from 'express';
// import createProduct from '../../../src/services/Product.service';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';
import ProductValidation from '../../../src/middlewares/ProductValidation.middleware';
import { ERROR_MESSAGES, STATUS_CODES } from '../../../src/utils/errorsMessagesStatus';
import sinonChai from 'sinon-chai';

chai.use(chaiHttp);
chai.use(sinonChai)

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;
  let next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    next = sinon.stub();
    sinon.restore();
  });

  it('obtém os produtos corretamente', async function () {
    const findAllStub = sinon.stub(ProductModel, 'findAll');
    const mockProducts = [
      { name: 'Test1', price: '100', orderId: 1 },
      { name: 'Test2', price: '200', orderId: 2 },
    ];
    const productModelInstances = mockProducts.map((product) => ProductModel.build(product));
    findAllStub.resolves(productModelInstances);

    const response = await chai.request(app).get('/products');

    expect(findAllStub.calledOnce).to.be.true;

    expect(response.status).to.equal(200);

    expect(response.body.length).to.equal(2);
    expect(response.body[0].name).to.equal(mockProducts[0].name);
    expect(response.body[0].price).to.equal(mockProducts[0].price);
    expect(response.body[0].orderId).to.equal(mockProducts[0].orderId);
    expect(response.body[1].name).to.equal(mockProducts[1].name);
    expect(response.body[1].price).to.equal(mockProducts[1].price);
    expect(response.body[1].orderId).to.equal(mockProducts[1].orderId);
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

  describe('ProductValidation', function () {
  it('passa para o próximo middleware quando o produto é válido', function () {
    req.body = { name: 'validName', price: 'validPrice' };

    ProductValidation(req, res, next);

    expect(next.calledOnce).to.be.true;
  });

  it('retorna um erro quando o nome não é informado', function () {
    req.body = { price: 'validPrice' };

    ProductValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: ERROR_MESSAGES.NAME.REQUIRED });
  });
  });
});
