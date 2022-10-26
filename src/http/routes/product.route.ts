import Router from "koa-router";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controllers";

export const productRouter = new Router({ prefix: "/products" });

productRouter.get("/", getProducts);
productRouter.get(`/:id`, getProductById);
productRouter.delete("/:id", deleteProduct);
productRouter.post("/", addProduct);
productRouter.put("/:id", updateProduct);