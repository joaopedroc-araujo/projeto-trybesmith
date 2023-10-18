import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Request, Response } from 'express';
import UserService from '../../../src/services/User.service';
import app from '../../../src/app'; 

chai.use(chaiHttp);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('retorna um token quando o login é válido', async function () {
    const loginStub = sinon.stub(UserService, 'login');
    const mockUser = { username: 'testUser', password: 'testPassword' };
    req.body = mockUser;

    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0VXNlciIsImlhdCI6MTYxODk1MjQwMn0.9y8a2yQw7f7tHq3mLgQ8m4zqK4oZw2x5Y7aBbO8j4sE';
    loginStub.resolves(mockToken);

    const response = await chai.request(app).post('/login').send(mockUser);

    expect(loginStub.calledOnce).to.be.true;
    expect(loginStub.calledWith(req.body)).to.be.true;

    expect(response.status).to.equal(200);
  
    expect(response.body.token).to.equal(mockToken);
  });

  it('retorna um erro quando não recebe username ou password', async function () {
    const loginStub = sinon.stub(UserService, 'login');
    const mockUser = { username: 'testUser' };
    req.body = mockUser;
  
    const response = await chai.request(app).post('/login').send(mockUser);
  
    expect(loginStub.called).to.be.false;
  
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"username" and "password" are required');
  });
  

  it('retorna um erro quando o login é inválido', async function () {
    const loginStub = sinon.stub(UserService, 'login');
    const mockUser = { username: 'testUser', password: 'wrongPassword' };
    req.body = mockUser;

    const mockError = new Error('Invalid username or password');
    loginStub.rejects(mockError);

    const response = await chai.request(app).post('/login').send(mockUser);

    expect(loginStub.calledOnce).to.be.true;
    expect(loginStub.calledWith(req.body)).to.be.true;

    expect(response.status).to.equal(401);
  
    expect(response.body.message).to.equal(mockError.message);
  });
});
