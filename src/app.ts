import express from 'express';
import ProductController from './controllers/Product.controller';

const app = express();

app.use(express.json());

app.use('/', ProductController);
export default app;
