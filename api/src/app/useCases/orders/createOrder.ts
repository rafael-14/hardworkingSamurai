import { Request, Response } from "express";
import { io } from "../../../index";
import { Order } from "../../models/Order";

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body;

    const order = await Order.create({ table, products });
    const orderDetails = await order.populate("products.product");
    console.log("fui chamado");
    io.emit("order@new", orderDetails);
    res.status(201).json(order);
  } catch (_error) {
    res.sendStatus(500);
  }
}
