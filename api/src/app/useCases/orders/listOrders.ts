import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function listOrders(_req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: 1 })
      .populate("products.product");
    res.json(orders);
  } catch (_error) {
    res.sendStatus(500);
  }
}
