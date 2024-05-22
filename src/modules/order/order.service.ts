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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
