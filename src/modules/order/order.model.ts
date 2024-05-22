import { Schema, model } from "mongoose";
import { ProductOrder } from "./order.interface";

const OrderSchema: Schema<ProductOrder> = new Schema<ProductOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const OrderModel = model<ProductOrder>("Order", OrderSchema);
