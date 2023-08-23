import { CreateUrlDto } from "@dtos/index";
import { IUrlDocument } from "@models/UrlModel";
import { Request, Response } from "express";
import { IParamsId, ResponseType } from "types";

export default interface IUrlController {
  createUrl(
    _req: Request<unknown, unknown, CreateUrlDto>,
    _res: Response<ResponseType<IUrlDocument>>
  ): Promise<void>;
  getUrl(
    _req: Request<IParamsId>,
    _res: Response<ResponseType<IUrlDocument>>
  ): Promise<void>;
  getAllUrls(
    _req: Request,
    _res: Response<ResponseType<IUrlDocument[]>>
  ): Promise<void>;
  deleteUrl(
    _req: Request<IParamsId>,
    _res: Response<ResponseType<boolean>>
  ): Promise<void>;
}
