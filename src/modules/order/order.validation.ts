import { z } from "zod";


const OrderZodSchema = z.object({
  email: z.string().email("Invalid email format"),
  productId: z.string(),
  price: z.number().positive("Price must be a positive number."),
  quantity: z.number().positive().int("Quantity must be a positive integer."),
});

export default OrderZodSchema;
