import logger from "@utils/logger";
import mongoose from "mongoose";

export default () =>
  mongoose
    .connect(getMongoUrl())
    .then(() => {
      logger.info("[MongoDB]: Connected successfully to server!");
    })
    .catch((error) => {
      logger.error("[MongoDB]: Error connecting to server!", error);
      process.exit(1);
    });

const getMongoUrl = (): string => {
  if (process.env.NODE_ENV === "production") {
    if (process.env.PROD_MONGO_URL === undefined) {
      throw new Error("PROD_MONGO_URL env variable is not defined");
    }
    return process.env.PROD_MONGO_URL;
  } else {
    if (process.env.DEV_MONGO_URL === undefined) {
      throw new Error("DEV_MONGO_URL env variable is not defined");
    }
    return process.env.DEV_MONGO_URL;
  }
};
