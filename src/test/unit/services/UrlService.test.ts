import "reflect-metadata";

import { CreateUrlDto, UpdateUrlDto } from "@dtos/CreateUrlDto";
import { IUrlService } from "@interfaces/index";
import { IUrlDocument } from "@models/UrlModel";
import { UrlRepository } from "@repositories/UrlRepository";

const mockUrlRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("UrlService", () => {
  let UrlService: IUrlService;

  beforeEach(() => {
    UrlService = new UrlService(mockUrlRepository as unknown as UrlRepository);
  });

  describe(".createUrl()", () => {
    it("should call the create method of the Url repository and return the created Url", async () => {
      const createUrlDto: CreateUrlDto = {
        name: "test Url",
        url: "https://test-Url.com",
        certLocation: "/path/to/cert",
      };

      const mockCreatedUrl: IUrlDocument = {
        ...createUrlDto,
        _id: "614c9d10de37f320048f336a",
      } as IUrlDocument;

      mockUrlRepository.create.mockResolvedValueOnce(mockCreatedUrl);

      const createdUrl = await UrlService.createUrl(createUrlDto);

      expect(mockUrlRepository.create).toHaveBeenCalledWith(createUrlDto);
      expect(createdUrl).toEqual(mockCreatedUrl);
    });
  });

  describe(".getAllUrls()", () => {
    it("should call the getAll method of the Url repository and return all Urls", async () => {
      const mockUrls: IUrlDocument[] = [
        {
          _id: "614c9d10de37f320048f336a",
          name: "test Url 1",
          url: "https://test-Url-1.com",
          certLocation: "/path/to/cert-1",
        } as IUrlDocument,
        {
          _id: "614c9d10de37f320048f336b",
          name: "test Url 2",
          url: "https://test-Url-2.com",
          certLocation: "/path/to/cert-2",
        } as IUrlDocument,
      ];

      mockUrlRepository.getAll.mockResolvedValueOnce(mockUrls);

      const Urls = await UrlService.getAllUrls();

      expect(mockUrlRepository.getAll).toHaveBeenCalled();
      expect(Urls).toEqual(mockUrls);
    });
  });

  describe(".getUrlById()", () => {
    const id = "614c9d10de37f320048f336a";
    const mockUrl: IUrlDocument = {
      _id: id,
      name: "test Url",
      url: "https://test-Url.com",
      certLocation: "/path/to/cert",
    } as IUrlDocument;
    it("should call the getById method of the Url repository with the given id and return the corresponding Url", async () => {
      mockUrlRepository.getById.mockResolvedValueOnce(mockUrl);

      const Url = await UrlService.getUrlById(id);

      expect(mockUrlRepository.getById).toHaveBeenCalledWith(id);
      expect(Url).toEqual(mockUrl);
    });
    it("should return null if the document doesn't exist", async () => {
      mockUrlRepository.getById.mockResolvedValueOnce(null);

      const Url = await UrlService.getUrlById(id);

      expect(mockUrlRepository.getById).toHaveBeenCalledWith(id);
      expect(Url).toEqual(null);
    });
  });

  describe(".updateUrlById()", () => {
    it("should return null if Url with the specified id doesn't exist", async () => {
      const id = "nonexistent-id";
      const updateUrlDto: UpdateUrlDto = {
        name: "new name",
        url: "new url",
        certLocation: "new cert location",
      };
      mockUrlRepository.update.mockResolvedValueOnce(null);

      const Url = await UrlService.updateUrlById(id, updateUrlDto);

      expect(mockUrlRepository.update).toHaveBeenCalledWith(id, updateUrlDto);
      expect(Url).toBeNull();
    });

    it("should update the Url and return the updated document", async () => {
      const id = "existing-id";
      const updateUrlDto: UpdateUrlDto = {
        name: "new name",
        url: "new url",
        certLocation: "new cert location",
      };
      const existingUrl: IUrlDocument = {
        _id: id,
        name: "old name",
        url: "old url",
        certLocation: "old cert location",
      } as IUrlDocument;
      const updatedUrl: IUrlDocument = {
        ...existingUrl,
        ...updateUrlDto,
      } as IUrlDocument;

      mockUrlRepository.update.mockResolvedValueOnce(updatedUrl);

      const Url = await UrlService.updateUrlById(id, updateUrlDto);

      expect(mockUrlRepository.update).toHaveBeenCalledWith(id, updateUrlDto);
      expect(Url).toEqual(updatedUrl);
    });
  });

  describe(".deleteUrlById()", () => {
    const id = "614c9d10de37f320048f336a";
    it("should return true if the Url is deleted", async () => {
      mockUrlRepository.delete.mockResolvedValueOnce(true);

      const result = await UrlService.deleteUrlById(id);

      expect(result).toBe(true);
      expect(mockUrlRepository.delete).toHaveBeenCalledWith(id);
    });

    it("should return false if the Url is not deleted", async () => {
      mockUrlRepository.delete.mockResolvedValueOnce(false);

      const result = await UrlService.deleteUrlById(id);

      expect(result).toBe(false);
      expect(mockUrlRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
