import { CreateUrlDto } from "@dtos/index";
import { IUrlService } from "@interfaces/index";
import { IUrlDocument } from "@models/UrlModel";
import { UrlRepository } from "@repositories/UrlRepository";
import { Inject, Service } from "typedi";

@Service()
export class UrlService implements IUrlService {
  constructor(
    @Inject()
    private readonly _UrlRepository: UrlRepository
  ) {}

  createUrl = (Url: CreateUrlDto): Promise<IUrlDocument> =>
    this._UrlRepository.create(Url);

  getAllUrls = (): Promise<IUrlDocument[]> => this._UrlRepository.getAll();

  getUrlById = (id: string): Promise<IUrlDocument | null> =>
    this._UrlRepository.getById(id);

  deleteUrlById = (id: string): Promise<boolean> =>
    this._UrlRepository.delete(id);
}
