import { IOrder } from "../schemas/order.entity";
import { ICartItem } from "../schemas/cart.entity";
import { IProduct } from "../schemas/product.entity";
import {
  createOrder,
  getOrdersByUserId,
} from "../repositories/order.repository";
import { getOrCreateCart } from "./cart.service";

export const createOrderFromCart = async (
  userId: string
): Promise<IOrder | null> => {
  // Fetch or create the cart for the user
  const cart = await getOrCreateCart(userId);

  // Check if the cart is empty
  if (!cart || cart.items.length === 0) {
    return null;
  }

  // Populate the product details in cart items
  const populatedCart = await cart.populate<{ items: {
    count: number; product: IProduct 
}[] }>(
    "items.product"
  );

  // Map cart items to order items
  const items: ICartItem[] = populatedCart.items.map((item) => {
    const product = item.product as IProduct; // Ensure product is of type IProduct
    console.log('Liam:product in order service');
    console.log(product);
    return {
      product: {
        _id: product._id,
        price: product.price,
      },
      count: item.count,
    } as ICartItem; // Explicitly cast as ICartItem
  });

  // Calculate the total price
  const total = items.reduce(
    (acc, item) => {
      const product = item.product as IProduct;
      return acc + item.count * product.price;
    },
    0
  );

  // Create and return the order
  return await createOrder(userId, items, total);
};


export const getOrdersForUser = async (userId: string): Promise<IOrder[]> => {
  return await getOrdersByUserId(userId);
};
