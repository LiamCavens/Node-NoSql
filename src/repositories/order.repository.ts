// src/repositories/order.repository.ts

import Order, { IOrder } from "../schemas/order.entity";
import { v4 as uuidv4 } from "uuid";
import { getOrCreateCart } from "../services/cart.service";

export const createOrder = async (
  userId: string,
  items: IOrder["items"],
  total: number
): Promise<IOrder> => {
  const cart = await getOrCreateCart(userId);

  const newOrder = new Order({
    uuid: uuidv4(),
    userId,
    cartId: cart.uuid,
    items,
    status: "created", 
    total,
  });

  return await newOrder.save();
};

export const getOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
  // Query the database for orders by user ID
  return await Order.find({ userId }).exec();
};
