import { Context } from "koa";
import { ResponseError } from "./error-response/response-error";
import { logger } from "../../utils/logger.utils";

export const errorMiddleWare = () => async (ctx: Context, next: () => void) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ResponseError) {
      ctx.status = err.statusCode;
      ctx.body = { message: err.message, details: err.details };
      logger.error({
        status: err.statusCode,
        message: err.message,
      });
    } else {
      ctx.internalServerError("something went wrong with the server");
    }
  }
};
