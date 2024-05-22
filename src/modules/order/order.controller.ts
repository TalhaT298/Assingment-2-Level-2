import { Request, Response } from "express";
import { TOrder } from "./order.interface";
import { OrderServices } from "./order.service";
import OrderZodSchema from "./order.validation";
import { ProductModel } from "../product/product.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;

    const zodParsedData = OrderZodSchema.parse(orderData);

    const product = await ProductModel.findById(zodParsedData.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "The Product not found",
      });
    }

    if (zodParsedData.quantity > product.inventory.quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock for the requested quantity",
      });
    }

    product.inventory.quantity -= zodParsedData.quantity;

    product.inventory.inStock = product.inventory.quantity > 0;

    await product.save();

    const result = await OrderServices.createOrderIntoDB(zodParsedData);

    return res.status(200).json({
      success: true,
      message: "Order has been successfully created",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error has occurred",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;
    const result = await OrderServices.getAllOrdersFromDB(email);

    let message = '';
    if (email) {
      message = result.length !== 0
        ? `Successfully fetched the user's email orders!`
        : `No orders found for email: ${email}`;
    } else {
      message = result.length !== 0
        ? "Successfully fetched orders!"
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
      message: "An error has occurred",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};