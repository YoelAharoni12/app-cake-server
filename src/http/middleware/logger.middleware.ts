import { Context } from "koa";
import { logger } from "../../utils/logger.utils";

export const loggerMiddleWare =
  () => async (ctx: Context, next: () => void) => {
    const start = new Date().getTime();
    logger.info(`Method : '${ctx.method}' request : '${ctx.url}'`);
    await next();
    const ms = new Date().getTime() - start;
    logger.info(
      `'${ctx.method}' request to '${ctx.url}' took '${ms}ms'. result status is: '${ctx.status}'`
    );
  };
