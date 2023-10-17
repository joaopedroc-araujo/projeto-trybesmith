import { expect } from 'chai';
import sinon from 'sinon';
import ProductService from '../../../src/services/Product.service';
import ProductModel from '../../../src/database/models/product.model';

describe('ProductsService', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('obtém os produtos corretamente', async function () {
    const findAllStub = sinon.stub(ProductModel, 'findAll');

    const product1 = { name: 'Test1', price: '100', orderId: 1 };
    const product2 = { name: 'Test2', price: '200', orderId: 2 };
    const productModelInstances = [ProductModel.build(product1), ProductModel.build(product2)];
    findAllStub.resolves(productModelInstances);

    const result = await ProductService.getProducts();

    expect(findAllStub.calledOnce).to.be.true;

    expect(result.length).to.equal(2);
    expect(result[0].name).to.equal(product1.name);
    expect(result[0].price).to.equal(product1.price);
    expect(result[0].orderId).to.equal(product1.orderId);
    expect(result[1].name).to.equal(product2.name);
    expect(result[1].price).to.equal(product2.price);
    expect(result[1].orderId).to.equal(product2.orderId);
  });

  it('cria o produto corretamente', async function () {

    const createStub = sinon.stub(ProductModel, 'create');

    const product = { name: 'Test', price: '100', orderId: 1 };
    const productModelInstance = ProductModel.build(product);
    createStub.resolves(productModelInstance);

    const result = await ProductService.createProduct(product);

    expect(createStub.calledOnce).to.be.true;
    expect(createStub.calledWith(product)).to.be.true;

    expect(result.name).to.equal(product.name);
    expect(result.price).to.equal(product.price);
    expect(result.orderId).to.equal(product.orderId);
  });
});
