import {connect} from "mongoose";
import {logger} from "../utils/logger.utils";

export const dbConnect = async () => {
   await connect('mongodb+srv://yoel:yoel1234@cluster0.rcxzklc.mongodb.net/cakes-app', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  logger.info("connecting to DB success");
};


