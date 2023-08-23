import "reflect-metadata";

import logger from "@utils/logger";
import { startApp } from "./app";

const PORT = 5000;
void startApp()
  .then((app) => {
    app.listen(PORT, () => {
      logger.info(`[API]: Server listening on port ${PORT}...`);
    });
  })
  .catch((error: Error) => {
    logger.error("[StartAppError]: Something went wrong!", { error });
  });
