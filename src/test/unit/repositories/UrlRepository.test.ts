import { CreateUrlDto, UpdateUrlDto } from "@dtos/CreateUrlDto";
import { IUrlRepository } from "@interfaces/index";
import { IUrlModel } from "@models/UrlModel";

const mockUrlModel = {
  create: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  deleteOne: jest.fn(),
};

const mockUrl = {
  _id: "614c9d10de37f320048f336a",
  name: "test Url",
  url: "https://test-Url.com",
  certLocation: "/path/to/cert",
  save: jest.fn(),
};

describe("UrlRepository", () => {
  let UrlRepository: IUrlRepository;

  beforeEach(() => {
    UrlRepository = new UrlRepository(mockUrlModel as unknown as IUrlModel);
  });

  describe(".create()", () => {
    it("should create a new Url and return the created document", async () => {
      const createUrlDto: CreateUrlDto = {
        name: "test Url",
        url: "https://test-Url.com",
        certLocation: "/path/to/cert",
      };

      const mockCreatedUrl = {
        ...createUrlDto,
        _id: "614c9d10de37f320048f336a",
      };

      mockUrlModel.create.mockResolvedValueOnce(mockCreatedUrl);

      const createdUrl = await UrlRepository.create(createUrlDto);

      expect(mockUrlModel.create).toHaveBeenCalledWith(createUrlDto);
      expect(createdUrl).toEqual(mockCreatedUrl);
    });
  });

  describe(".getById()", () => {
    it("should return a Url document by id", async () => {
      mockUrlModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockUrl),
      });

      const Url = await UrlRepository.getById(mockUrl._id);

      expect(mockUrlModel.findById).toHaveBeenCalledWith(mockUrl._id);
      expect(Url).toEqual(mockUrl);
    });

    it("should return null if the document doesn't exist", async () => {
      mockUrlModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const Url = await UrlRepository.getById(mockUrl._id);

      expect(mockUrlModel.findById).toHaveBeenCalledWith(mockUrl._id);
      expect(Url).toEqual(null);
    });
  });

  describe(".getAll()", () => {
    it("should return an array of Url documents", async () => {
      mockUrlModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce([mockUrl]),
      });

      const Urls = await UrlRepository.getAll();

      expect(mockUrlModel.find).toHaveBeenCalled();
      expect(Urls).toEqual([mockUrl]);
    });
  });

  describe(".update()", () => {
    const updateUrlDto: UpdateUrlDto = {
      name: "new name",
      url: "https://new-url.com",
      certLocation: "/path/to/new/cert",
    };
    const id = mockUrl._id;

    it("should update an existing Url and return the updated document", async () => {
      mockUrlModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockUrl),
      });

      mockUrl.save.mockResolvedValueOnce({
        ...mockUrl,
        ...updateUrlDto,
      });

      const updatedUrl = await UrlRepository.update(id, updateUrlDto);

      expect(mockUrlModel.findById).toHaveBeenCalledWith(id);
      expect(mockUrl.name).toBe(updateUrlDto.name);
      expect(mockUrl.url).toBe(updateUrlDto.url);
      expect(mockUrl.certLocation).toBe(updateUrlDto.certLocation);
      expect(mockUrl.save).toHaveBeenCalled();
      expect(updatedUrl).toEqual(mockUrl);
    });

    it("should return null if the Url does not exist", async () => {
      mockUrlModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const updatedUrl = await UrlRepository.update(id, updateUrlDto);

      expect(mockUrlModel.findById).toHaveBeenCalledWith(id);
      expect(updatedUrl).toBeNull();
    });
  });
  describe(".delete()", () => {
    const id = mockUrl._id;
    it("should return true if document is deleted", async () => {
      mockUrlModel.deleteOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({
          deletedCount: 1,
        }),
      });

      const result = await UrlRepository.delete(id);

      expect(mockUrlModel.deleteOne).toHaveBeenCalledWith({
        _id: id,
      });
      expect(result).toBe(true);
    });

    it("should return false if document is not found", async () => {
      mockUrlModel.deleteOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({
          deletedCount: 0,
        }),
      });

      const result = await UrlRepository.delete(id);

      expect(mockUrlModel.deleteOne).toHaveBeenCalledWith({
        _id: id,
      });
      expect(result).toBe(false);
    });
  });
});
