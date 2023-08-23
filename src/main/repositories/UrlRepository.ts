import { CreateUrlDto } from "@dtos/index";
import { IUrlRepository } from "@interfaces/index";
import { IUrlDocument, IUrlModel } from "@models/UrlModel";
import { Inject, Service } from "typedi";

@Service()
export class UrlRepository implements IUrlRepository {
  constructor(@Inject("UrlModel") private readonly _UrlModel: IUrlModel) {}

  create = async (createUrlDto: CreateUrlDto): Promise<IUrlDocument> =>
    await this._UrlModel.create(createUrlDto);

  getById = async (id: string): Promise<IUrlDocument | null> =>
    await this._UrlModel.findById(id).exec();

  getAll = async (): Promise<IUrlDocument[]> =>
    await this._UrlModel.find().exec();

  delete = async (id: string): Promise<boolean> => {
    const result = await this._UrlModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  };
}
