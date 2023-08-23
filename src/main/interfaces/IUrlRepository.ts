import { IUrl, IUrlDocument } from "@models/UrlModel";

export default interface IUrlRepository {
  create(_Url: IUrl): Promise<IUrlDocument>;
  getById(_id: string): Promise<IUrlDocument | null>;
  getAll(): Promise<IUrlDocument[]>;
  delete(_id: string): Promise<boolean>;
}
