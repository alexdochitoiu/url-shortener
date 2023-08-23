import { UrlController } from "@controllers/UrlController";
import { RequestHandler, Router } from "express";
import { Inject, Service } from "typedi";
import { IRouter } from "types";

@Service()
export class UrlRouter implements IRouter {
  constructor(
    @Inject()
    private readonly _UrlController: UrlController
  ) {}

  getRouter = (): Router => {
    const router = Router();
    router.post("/", this._UrlController.createUrl as RequestHandler);
    router.get("/", this._UrlController.getAllUrls as RequestHandler);
    router.get(
      "/:id",
      this._UrlController.getUrl as RequestHandler<{ id: string }>
    );
    router.delete(
      "/:id",
      this._UrlController.deleteUrl as RequestHandler<{ id: string }>
    );
    return router;
  };
}
