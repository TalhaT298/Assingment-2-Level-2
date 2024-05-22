import { z } from "zod";


const OrderZodSchema = z.object({
  email: z.string().email("The email address entered is not valid"),
  productId: z.string(),
  price: z.number().positive("Please enter a positive value for the price"),
  quantity: z.number().positive().int("Please enter a positive integer for the quantity."),
});

export default OrderZodSchema;
