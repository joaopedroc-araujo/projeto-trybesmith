import express from 'express';
import ProductController from './controllers/Product.controller';
import OrderController from './controllers/Order.controller';
import UserController from './controllers/User.controller';

const app = express();

app.use(express.json());

app.use('/', ProductController);
app.use('/', OrderController);
app.use('/', UserController);

export default app;
