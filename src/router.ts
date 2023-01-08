import path from 'path'

import { Router } from "express"
import multer from 'multer'

import { listCategories, createCategory } from './app/controllers/categories'
import { listProducts, createProduct, listProductsByCategory } from "./app/controllers/products";
import { listOrder } from './app/controllers/orders';

export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback){
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback){
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
})

//List categories
router.get('/categories', listCategories);

//Create categories
router.post('/categories', createCategory);

//List products
router.get('/products', listProducts);
//Create products
router.post('/products', upload.single('image'), createProduct);

//Get products by category
router.get('/products/:categoryId', listProductsByCategory);
//List orders
router.get('/orders', listOrder);
//Create order
//Change order
//Delete order
