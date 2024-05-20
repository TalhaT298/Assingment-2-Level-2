import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { TProduct } from "./product.interface";
import ProductZodSchema from "./product.validation";

// Define the createProduct function with proper typing
const createProduct = async (req: Request, res: Response) => {
    try {
        
        const productData: TProduct = req.body;

        // Data validation using Zod
        const zodParsedData = ProductZodSchema.parse(productData);

        // Call the service function to send this data
        const result = await ProductServices.createProductIntoDB(zodParsedData);

        // Send response
        res.status(200).json({
            success: true,
            message: 'Product is created successfully',
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await ProductServices.getAllProductFromDB();
  
      res.status(200).json({
        succuess: true,
        message: 'Products are retrieve sucessfully',
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        succuess: false,
        message: 'Something went wrong',
        error: err,
      });
    }
  };

export const ProductControllers = {
    createProduct,
    getAllProducts
};