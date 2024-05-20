import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateProductInDB = async (productId: string, productData: TProduct) => {
  const product = await ProductModel.findByIdAndUpdate(productId, productData);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductInDB,
};