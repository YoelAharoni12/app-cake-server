import koa from "koa";
import { productRouter } from "./http/routes/product.route";
import respond from "koa-respond";
import bodyParser from "koa-bodyparser";
import { errorMiddleWare } from "./http/middleware/error.middleware";
import { loggerMiddleWare } from "./http/middleware/logger.middleware";
import {cartRouter} from "./http/routes/cart.route";

import cors from "@koa/cors";

export const app = new koa();
app.use(cors())
app.use(bodyParser());
app.use(respond());
app.use(loggerMiddleWare());
app.use(errorMiddleWare());
app.use(productRouter.routes()).use(productRouter.allowedMethods());
app.use(cartRouter.routes()).use(cartRouter.allowedMethods());
