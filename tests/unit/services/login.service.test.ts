import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import bcrypt from 'bcryptjs';
import UserModel from '../../../src/database/models/user.model';
import JWTMiddleware from '../../../src/auth/JWT.middleware';
import UserService from '../../../src/services/User.service';
import jwt from 'jsonwebtoken';
import { Model } from 'sequelize';

chai.use(chaiHttp);

describe('Login Service', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('retorna um token quando o login é bem sucedido', async () => {
    const user = {
      get: function(prop: string) {
        if (prop === 'id') return 1;
        if (prop === 'username') return 'testUser';
        if (prop === 'password') return bcrypt.hashSync('testPassword');
      }
    };

    sinon.stub(UserModel, 'findOne').returns(Promise.resolve(user as unknown as Model<any, any>));
    sinon.stub(bcrypt, 'compare').resolves(true);

    const token = await UserService.login({ username: 'testUser', password: 'testPassword' });

    expect(token).to.be.a('string');
  });

  it('retorna um erro quando o username é inválido', async () => {
    sinon.stub(UserModel, 'findOne').returns(Promise.resolve(null));

    try {
      await UserService.login({ username: 'invalidUser', password: 'testPassword' });
    } catch (error) {
      const { message } = error as Error;
      expect(message).to.equal('Username or password invalid');
    }
  });

  it('retorna um erro quando o password é inválido', async () => {
    const user = {
      get: function(prop: string) {
        if (prop === 'id') return 1;
        if (prop === 'username') return 'testUser';
        if (prop === 'password') return bcrypt.hashSync('testPassword');
      }
    };

    sinon.stub(UserModel, 'findOne').returns(Promise.resolve(user as unknown as Model<any, any>));
    sinon.stub(bcrypt, 'compare').resolves(true);

    try {
      await UserService.login({ username: 'testUser', password: 'invalidPassword' });
    } catch (error) {
      const { message } = error as Error;
      expect(message).to.equal('Username or password invalid');
    }
  });
});

describe('JWT Middleware', () => {
  it('retorna um token', () => {
    const token = JWTMiddleware.sign({ id: 1, username: 'testUser' });

    expect(token).to.be.a('string');
  });

  it('retorna um payload quando o token é válido', () => {
    const token = jwt.sign({ id: 1, username: 'testUser' }, process.env.JWT_SECRET || 'paralelepipedo');
  
    const payload = JWTMiddleware.verify(token);
  
    expect(payload).to.have.property('id', 1);
    expect(payload).to.have.property('username', 'testUser');
  });
  
  it('retorna um erro quando o token é inválido', () => {
    try {
      JWTMiddleware.verify('invalidToken');
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
    }
  });

});
