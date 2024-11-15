import { IOrder } from "../schemas/order.entity";
import { ICartItem } from "../schemas/cart.entity";
import {
  createOrder,
  getOrdersByUserId,
} from "../repositories/order.repository";
import { getOrCreateCart } from "./cart.service";
import mongoose from "mongoose";

export const createOrderFromCart = async (
  userId: string
): Promise<IOrder | null> => {
  const cart = await getOrCreateCart(userId);

  if (!cart || cart.items.length === 0) {
    return null;
  }

  const items = cart.items.map((item) => {
    const product = item.product as {
      _id: mongoose.Types.ObjectId;
      price: number;
    };
    return {
      product: {
        _id: product._id,
        price: product.price,
      },
      count: item.count,
    } as ICartItem; 
  });

  const total = items.reduce(
    (acc, item) => acc + item.count * item.product.price,
    0
  );

  return await createOrder(userId, items, total);
};

export const getOrdersForUser = async (userId: string): Promise<IOrder[]> => {
  return await getOrdersByUserId(userId);
};
