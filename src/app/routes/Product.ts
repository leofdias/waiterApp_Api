import path from 'path'
import { Router } from "express"
import multer from 'multer'

import { listProducts, createProduct, listProductsByCategory } from './../controllers/products'

export const productRouter = Router()

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
//List products
productRouter.get('/', listProducts);
//Create products
productRouter.post('/', upload.single('image'), createProduct);

//Get products by category
productRouter.get('/:categoryId', listProductsByCategory);
