import koa from "koa";
import {productRouter} from "./http/routes/product.route";
import respond from "koa-respond";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

export const app = new koa();
app.use(cors())
app.use(bodyParser());
app.use(respond());
app.use(productRouter.routes()).use(productRouter.allowedMethods());
