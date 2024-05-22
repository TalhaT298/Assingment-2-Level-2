import { Request, Response } from "express";
import { ProductOrder } from "./order.interface";
import { OrderServices } from "./order.service";
import OrderZodSchema from "./order.validation";
import { ProductModel } from "../product/product.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: ProductOrder = req.body;

    const zodParsedData = OrderZodSchema.parse(orderData);

    const product = await ProductModel.findById(zodParsedData.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (zodParsedData.quantity > product.inventory.quantity) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds",
      });
    }

    product.inventory.quantity -= zodParsedData.quantity;

    product.inventory.inStock = product.inventory.quantity > 0;

    await product.save();

    const result = await OrderServices.createOrderIntoDataBase(zodParsedData);

    return res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;
    const result = await OrderServices.getAllOrdersFromDataBase(email);

    let message = '';
    if (email) {
      message = result.length !== 0
        ? `Successfully fetched orders associated with this email`
        : `No orders found for this email: ${email}`;
    } else {
      message = result.length !== 0
        ? "Orders fetched successfully!"
        : "No orders found.";
    }

    res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      succuess: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};