import addApiRoutes from "@infra/addExpressRoutes";
import connectMongo from "@infra/connectMongo";
import registerServices from "@infra/registerServices";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

const startApp = async () => {
  dotenv.config();

  const app = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get("/api/health-check", (_req: Request, res: Response) =>
    res.sendStatus(200)
  );

  await connectMongo();
  registerServices();
  addApiRoutes(app);

  return app;
};

export { startApp };
