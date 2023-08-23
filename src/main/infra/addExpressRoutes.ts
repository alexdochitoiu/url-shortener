import { UrlRouter } from "@routers/UrlRouter";
import { Express } from "express";
import { Container } from "typedi";

export default function addExpressRoutes(app: Express) {
  const urlRouter = Container.get(UrlRouter);
  app.use("/api/urls", urlRouter.getRouter());
}
