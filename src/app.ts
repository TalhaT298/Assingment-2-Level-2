import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./modules/Product/product.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());


// applications routes 
app.use('/api/products',ProductRoutes)

app.get("/", (req: Request, res: Response) => {
  const a = "Hello World!";
  res.send(a);
});

export default app;