import { Request, Response } from "express"

import { Order } from "../models/Order"

export async function listOrder(req: Request, res: Response) {
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    res.status(500).json({error})
    console.log(error)
  };
}

export async function createOrder(req: Request, res: Response) {
  try {
    const { name, icon } = req.body

    const category = await Order.create({name, icon})
    res.status(201).json(category)
  } catch (error) {
    res.status(500).json({error})
    console.log(error)
  }
}
