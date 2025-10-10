import CommonApi from "@ireves/common-api";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import path from "path";
import "./scheduler/timetableScheduler";

import config from "@/config";
import { initializeFirebase } from "@/firebase";
import { schedules } from "@/scheduler";
import { customRouterMiddleware } from "@/middlewares";

dotenv.config();
dotenv.config({ path: ".env.production" });

CommonApi.initializeConfig(config);
initializeFirebase();
CommonApi.initializeScheduler(schedules);
runExpressApp();

function runExpressApp() {
  const app = new CommonApi.App(
    path.join(__dirname, "router"),
    [
      fileUpload({
        defCharset: "utf8",
        defParamCharset: "utf8",
        limits: { fileSize: 50 * 1024 * 1024 },
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "..", "tmp"),
      }),
    ],
    customRouterMiddleware,
    []
  );
  app.run(
    config.port,
    () => {
      console.info(`Server started with port: ${config.port}`);
    },
    (error) => {
      CommonApi.logger.error(error);
    }
  );
}