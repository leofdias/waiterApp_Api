import { Request, Response } from "express"

import { Order } from "../models/Order"

export async function listOrder(req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .sort({ createAt: 1 })
      .populate('products.product');

    res.json(orders);
  } catch (error) {
    res.status(500).json({error});
    console.log(error);
  };
}

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body;

    const order = await Order.create({table, products});
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({error});
    console.log(error);
  }
}

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if(!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)){
      return res.status(400).json({
        error: 'Status should be one of these: WAITING, IN_PRODUCTION or DONE.'
      });
    }

    await Order.findByIdAndUpdate(orderId, { status });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({error})
    console.log(error)
  }
}

export async function cancelOrder(req: Request, res: Response) {
  try {
    const { orderId } = req.params

    await Order.findByIdAndDelete(orderId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({error})
    console.log(error)
  }
}
