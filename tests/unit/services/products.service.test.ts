import { expect } from 'chai';
import sinon from 'sinon';
import createProduct from '../../../src/services/Product.service';
import ProductModel from '../../../src/database/models/product.model';

describe('ProductsService', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('cria o produto corretamente', async function () {

    const createStub = sinon.stub(ProductModel, 'create');

    const product = { name: 'Test', price: '100', orderId: 1 };
    const productModelInstance = ProductModel.build(product);
    createStub.resolves(productModelInstance);

    const result = await createProduct(product);

    expect(createStub.calledOnce).to.be.true;
    expect(createStub.calledWith(product)).to.be.true;

    expect(result.name).to.equal(product.name);
    expect(result.price).to.equal(product.price);
    expect(result.orderId).to.equal(product.orderId);
  });
});
