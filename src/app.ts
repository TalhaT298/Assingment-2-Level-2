import express, { Application, Request, Response } from "express";
import cors from "cors";
import { OrderRoutes } from "./modules/order/order.route";
import { ProductRoutes } from "./modules/product/product.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  const a = "Hello World";
  res.send(a);
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not Founde",
  });
});

export default app;