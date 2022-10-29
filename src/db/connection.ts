import {connect} from "mongoose";
import {logger} from "../utils/logger.utils";
import nconf from "nconf";

export const dbConnect = async () => {
    await connect(nconf.get('dbConnectionString'), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    });
    logger.info("connecting to DB success");
};


