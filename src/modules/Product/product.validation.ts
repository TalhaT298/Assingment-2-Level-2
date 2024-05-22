import { z } from "zod";
const ZodVariantSchema = z.object({
  type: z.string().min(1, "The variant value field cannot be empty."),
  value: z.string().min(1, "The variant value field cannot be empty."),
});
const InventoryZodSchema = z.object({
  quantity: z.number().min(0, "The quantity field must contain a non-negative number."),
  inStock: z.boolean().refine((val) => val !== null, {
    message: "The in-stock status field cannot be empty.",
  }),
});
const ProductZodSchema = z.object({
  name: z.string().min(1, "The product name field cannot be empty."),
  description: z.string().min(1, "The product description field cannot be empty."),
  price: z.number().positive("The price field must contain a positive number."),
  category: z.string().min(1, "The category field cannot be empty."),
  tags: z
    .array(z.string().min(1, "The tags field cannot be empty."))
    .nonempty("The product must have at least one tag."),
  variants: z
    .array(ZodVariantSchema)
    .nonempty("The product must have at least one variant."),
  inventory: InventoryZodSchema,
  isDeleted: z.boolean().optional(),
});
export default ProductZodSchema;
