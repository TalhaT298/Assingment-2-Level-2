import { QueryParams, TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

type SearchCriteria = {
  name?: { $regex: string; $options: string };
  category?: { $regex: string; $options: string };
  description?: { $regex: string; $options: string };
};

const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDB = async (query: QueryParams) => {
  try {
    const searchCriteria: SearchCriteria = {};

    if (query.name) {
      searchCriteria.name = { $regex: query.name, $options: "i" };
    }

    if (query.category) {
      searchCriteria.category = { $regex: query.category, $options: "i" };
    }

    if (query.description) {
      searchCriteria.description = { $regex: query.description, $options: "i" };
    }

    const products = await ProductModel.find(searchCriteria);
    return products;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

const updateProductIntoDB = async (productId: string, productData: TProduct) => {
  const product = await ProductModel.findByIdAndUpdate(productId, productData, {
    new: true,
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductIntoDB,
};
