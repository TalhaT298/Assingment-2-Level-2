import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { PProduct } from "./product.interface";
import ProductZodSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: PProduct = req.body;

    const zodParsedData = ProductZodSchema.parse(productData);

    const result = await ProductServices.createProductIntoDataBase(zodParsedData);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { query } = req;

    const result = await ProductServices.getAllProductFromDataBase(query);

    const isQueryEmpty = Object.keys(query).length === 0;

    res.status(200).json({
      success: true,
      message: isQueryEmpty
        ? "Products fetched successfully!"
        : `Products matching search term' ${Object.values(query)}'fetched successfully!`,
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDataBase(productId);

    res.status(200).json({
      succuess: true,
      message: "Product is retrieve sucessfully!",
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    const zodParsedData = ProductZodSchema.parse(productData);

    const result = await ProductServices.updateProductIntoDataBase(
      productId,
      zodParsedData,
    );

    res.status(200).json({
      succuess: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      succuess: false,
      message: "Something went wrong",
      error: err.message || err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductFromDataBase(productId);

    res.status(200).json({
      succuess: true,
      message: "Product deleted successfully!",
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

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};