import log4js from "log4js";
import nconf from "nconf";

export const initiateLogger = () => {
  log4js.configure(nconf.get("loggerConfig"));
};
export const logger = log4js.getLogger("app");
