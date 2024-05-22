import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { TProduct } from "./product.interface";
import ProductZodSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: TProduct = req.body;

    const zodParsedData = ProductZodSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: "The product has been successfully created",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "A problem has occurred",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { query } = req;

    const result = await ProductServices.getAllProductFromDB(query);

    const isQueryEmpty = Object.keys(query).length === 0;

    res.status(200).json({
      success: true,
      message: isQueryEmpty
        ? "Successfully fetched the products"
        : `Products that match the search term'${Object.values(query)}' were fetched successfully!`,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "A problem has occurred",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      succuess: true,
      message: "Product is retrieve sucessfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      succuess: false,
      message: "A problem has occurred",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    const zodParsedData = ProductZodSchema.parse(productData);

    const result = await ProductServices.updateProductIntoDB(
      productId,
      zodParsedData,
    );

    res.status(200).json({
      succuess: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      succuess: false,
      message: "Something went wrong",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      succuess: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      succuess: false,
      message: "Something went wrong",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
