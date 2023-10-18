import express from 'express';
import ProductController from './controllers/Product.controller';
import OrderController from './controllers/Order.controller';

const app = express();

app.use(express.json());

app.use('/', ProductController);
app.use('/', OrderController);

export default app;
