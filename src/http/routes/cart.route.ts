import Router from "koa-router";
import {checkout} from "../controllers/cart.controller";

export const cartRouter = new Router({prefix:"/cart"});
cartRouter.post("/checkout", checkout);