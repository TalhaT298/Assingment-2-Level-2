import { ProductOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDataBase = async (order: ProductOrder) => {
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrdersFromDataBase = async (email?: string) => {
  try {
    const query = email ? { email } : {};
    const orders = await OrderModel.find(query);
    console.log(orders)
    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const OrderServices = {
  createOrderIntoDataBase,
  getAllOrdersFromDataBase,
};