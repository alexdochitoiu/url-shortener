import { CreateUrlDto } from "@dtos/index";
import { IUrlDocument } from "@models/UrlModel";

export default interface IUrlService {
  createUrl(_Url: CreateUrlDto): Promise<IUrlDocument>;
  getUrlById(_id: string): Promise<IUrlDocument | null>;
  getAllUrls(): Promise<IUrlDocument[]>;
  deleteUrlById(_id: string): Promise<boolean>;
}
