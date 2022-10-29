import Router from "koa-router";
import {addProduct, getProductById, getProducts,} from "../controllers/product.controllers";

export const productRouter = new Router({ prefix: "/products" });

productRouter.get("/", getProducts);
productRouter.get(`/:id`, getProductById);
productRouter.post("/", addProduct);
