import { Router } from "express"
import multer from 'multer'

import { listCategories, createCategory } from './../controllers/categories'

export const categoryRouter = Router()

//List categories
categoryRouter.get('/', listCategories);

//Create categories
categoryRouter.post('/', createCategory);

