import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrdersFromDB = async (email?: string) => {
  try {
    const query = email ? { email } : {};
    const orders = await OrderModel.find(query);
    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
