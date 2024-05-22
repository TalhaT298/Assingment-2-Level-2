import { QueryParams, PProduct } from "./product.interface";
import { ProductModel } from "./product.model";


const createProductIntoDataBase = async (product: PProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDataBase = async (query: QueryParams) => {
  try {
    const searchCriteria:{ [key: string]: any } = {};

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
  } catch (error: any) {
    throw new Error(error);
  }
};

const getSingleProductFromDataBase = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const deleteProductFromDataBase = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

const updateProductIntoDataBase = async (productId: string, productData: PProduct) => {
  const product = await ProductModel.findByIdAndUpdate(productId, productData, {
    new: true,
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const ProductServices = {
  createProductIntoDataBase,
  getAllProductFromDataBase,
  getSingleProductFromDataBase,
  deleteProductFromDataBase,
  updateProductIntoDataBase,
};
