import { Router } from "express"
import multer from 'multer'

import { listOrder, createOrder, changeOrderStatus, cancelOrder } from './../controllers/orders'

export const orderRouter = Router()

//List orders
orderRouter.get('/', listOrder);

//Criar order
orderRouter.post('/', createOrder)


//Atualizar status de um order
orderRouter.post('/:orderId', changeOrderStatus);

//Cancelar um order
orderRouter.delete('/:orderId', cancelOrder);
