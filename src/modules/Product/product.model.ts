import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const VariantSchema: Schema = new Schema<TVariant>({
    type: { type: String, required: true },
    value: { type: String, required: true },
  });
  
  const InventorySchema: Schema = new Schema<TInventory>({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  });
  
  const ProductSchema: Schema = new Schema<TProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [VariantSchema], required: true },
    inventory: { type: InventorySchema, required: true },
  });
  
  export const ProductModel = model<TProduct>('Product', ProductSchema);