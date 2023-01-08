import { Request, Response } from "express"

import { Product } from "../models/Product";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({error})
    console.log(error)
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { category, description, ingredients, name, price } = req.body;

    console.log('req.body', req.body)
    console.log('ingredients', ingredients)
    const product = await Product.create({ name, description, imagePath, price: Number(price), category, ingredients: ingredients ? JSON.parse(ingredients) : [] })
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({error})
    console.log(error)
  }
}

export async function listProductsByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params
    const categories = await Product.find().where('category').equals(categoryId);

    res.json(categories);
  } catch (error) {
    res.status(500).json({error})
    console.log("error", error)
  }
}
