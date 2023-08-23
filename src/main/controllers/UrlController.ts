import { CreateUrlDto } from "@dtos/index";
import { IUrlController } from "@interfaces/index";
import { IUrlDocument } from "@models/UrlModel";
import { UrlService } from "@services/UrlService";
import logger from "@utils/logger";
import UrlValidator from "@validators/UrlValidator";
import { Request, Response } from "express";
import { ValidationError } from "joi";
import { Inject, Service } from "typedi";
import { IParamsId, ResponseType } from "types";

@Service()
export class UrlController implements IUrlController {
  constructor(
    @Inject() private readonly _UrlService: UrlService,
    @Inject() private readonly _UrlValidator: UrlValidator
  ) {}

  createUrl = async (
    req: Request<unknown, unknown, CreateUrlDto>,
    res: Response<ResponseType<IUrlDocument>>
  ): Promise<void> => {
    try {
      this._UrlValidator.validateCreateUrlInput(req.body);
      const createUrlDto: CreateUrlDto = {
        longUrl: req.body.longUrl,
      };
      const Url = await this._UrlService.createUrl(createUrlDto);
      logger.info("[UrlController]: Url successfully created!");
      res.status(201).json(Url);
    } catch (error) {
      logger.error("[UrlController]: CreateUrlError", { error });
      if (error instanceof ValidationError) {
        res.status(400).json({ errorMessage: error.message });
        return;
      }
      res.status(500).json({ errorMessage: "Error creating Url" });
    }
  };

  getUrl = async (
    req: Request<IParamsId>,
    res: Response<ResponseType<IUrlDocument>>
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const Url = await this._UrlService.getUrlById(id);
      if (!Url) {
        res.status(404).json({ errorMessage: "Url not found" });
        return;
      }
      res.status(200).json(Url);
    } catch (error) {
      logger.error("[UrlController]: GetUrlError", { id, error });
      res.status(500).json({ errorMessage: "Error getting Url" });
    }
  };

  getAllUrls = async (
    _req: Request,
    res: Response<ResponseType<IUrlDocument[]>>
  ): Promise<void> => {
    try {
      const Urls = await this._UrlService.getAllUrls();
      res.status(200).json(Urls);
    } catch (error) {
      logger.error("[UrlController]: GetAllUrlsError", { error });
      res.status(500).json({ errorMessage: "Error getting Urls" });
    }
  };

  deleteUrl = async (
    req: Request<IParamsId>,
    res: Response<ResponseType<boolean>>
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const result = await this._UrlService.deleteUrlById(req.params.id);
      if (!result) {
        logger.info("[UrlController]: Url cannot be found for delete!", {
          id,
        });
        res.status(404).json({ errorMessage: "Url not found" });
        return;
      }
      logger.info("[UrlController]: Url successfully deleted!");
      res.status(200).json(result);
    } catch (error) {
      logger.error("[UrlController]: DeleteUrlError", { id, error });
      res.status(500).json({ errorMessage: "Error deleting Url" });
    }
  };
}
