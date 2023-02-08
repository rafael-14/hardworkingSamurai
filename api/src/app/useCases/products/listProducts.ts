import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function listProducts(_req: Request, res: Response) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (_error) {
    res.sendStatus(500);
  }
}
