import path from 'path'
import express from 'express'
import mongoose from 'mongoose'

import { categoryRouter } from './app/routes/Category'
import { orderRouter } from './app/routes/Order'
import { productRouter } from './app/routes/Product'

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/foodApp')
  .then(() => {
    const app = express();
    const port = 3001;

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    app.use(express.json())

    app.use('/api/categories', categoryRouter);
    app.use('/api/orders', orderRouter);
    app.use('/api/products', productRouter);

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    })
  })
  .catch((error) => console.log('Erro ao conectar ao mongodb:', error));


