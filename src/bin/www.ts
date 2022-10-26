import {initiateConfig} from "../utils/config";
import nconf from "nconf";

initiateConfig();

import {app} from "../app";
import {initiateLogger, logger} from "../utils/logger.utils";
import {dbConnect} from "../db/connection";

(async () => {
    initiateLogger();
    process.on("unhandledRejection", (reason) => logger.error(reason));
    process.on("uncaughtException", (error) => logger.error(error));

    await dbConnect();
    const PORT = nconf.get("port");
    app.listen(PORT, () => {
        logger.info(`Application is running on port  ${PORT}`);
    });
})();
