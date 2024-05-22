import { z } from "zod";


const OrderZodSchema = z.object({
  email: z.string().email("The email address is not in the correct format"),
  productId: z.string(),
  price: z.number().positive("The price must be a positive number."),
  quantity: z.number().positive().int("The quantity must be a positive whole number."),
});

export default OrderZodSchema;
