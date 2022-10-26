import nconf from "nconf";

export const initiateConfig = () => {
  nconf
    .argv()
    .env()
    .file("application", { file: "config/app.config.json" })
    .file("logger", { file: "config/logger.config.json" });
};
