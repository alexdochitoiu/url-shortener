import "reflect-metadata";

import { CreateUrlDto } from "@dtos/CreateUrlDto";
import { IUrlController } from "@interfaces/index";
import { IUrlDocument } from "@models/UrlModel";
import { UrlService } from "@services/UrlService";
import UrlValidator from "@validators/UrlValidator";
import { Request, Response } from "express";
import { ValidationError } from "joi";
import { IParamsId } from "types";

jest.mock("@validators/UrlValidator");
jest.mock("@utils/logger");

const mockUrlService = {
  createUrl: jest.fn(),
  getUrlById: jest.fn(),
  getAllUrls: jest.fn(),
};

describe("UrlController", () => {
  let UrlController: IUrlController;
  let UrlValidator: jest.Mocked<UrlValidator>;
  let req: Request;
  let res: Response;
  const id = "614c9d10de37f320048f336a";

  beforeEach(() => {
    UrlValidator = new UrlValidator() as jest.Mocked<UrlValidator>;
    UrlController = new UrlController(
      mockUrlService as unknown as UrlService,
      UrlValidator
    );
    req = {} as Request;
    res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    res.sendStatus = jest.fn().mockReturnThis();
  });

  describe(".createUrl()", () => {
    const createUrlDto: CreateUrlDto = {
      name: "testUrl",
      url: "testUrl",
      certLocation: "testLocation",
    };

    beforeEach(() => {
      req.body = createUrlDto;
    });

    it("should call UrlValidator.validateCreateUrlInput and UrlService.createUrl with the correct arguments", async () => {
      mockUrlService.createUrl.mockResolvedValueOnce(createUrlDto);

      await UrlController.createUrl(req, res);

      expect(UrlValidator.validateCreateUrlInput).toHaveBeenCalledWith(
        createUrlDto
      );
      expect(mockUrlService.createUrl).toHaveBeenCalledWith(createUrlDto);
    });

    it("should return a 201 status and the created Url on success", async () => {
      mockUrlService.createUrl.mockResolvedValueOnce(createUrlDto);

      await UrlController.createUrl(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createUrlDto);
    });

    it("should return a 400 status and the validation error message on validation error", async () => {
      const errorMessage = "Validation error";
      const validationError = new ValidationError(errorMessage, [], {});
      UrlValidator.validateCreateUrlInput.mockImplementationOnce(() => {
        throw validationError;
      });

      await UrlController.createUrl(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ errorMessage });
    });

    it("should return a 500 status and error message on error", async () => {
      const errorMessage = "Error creating Url";
      mockUrlService.createUrl.mockRejectedValueOnce(new Error(errorMessage));

      await UrlController.createUrl(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ errorMessage });
    });
  });

  describe(".getUrl()", () => {
    beforeEach(() => {
      req.params = { id };
    });

    it("should return a 404 error if the Url does not exist", async () => {
      mockUrlService.getUrlById.mockResolvedValueOnce(undefined);

      await UrlController.getUrl(req as unknown as Request<IParamsId>, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: "Url not found",
      });
    });

    it("should return a 200 response with the Url data if it exists", async () => {
      const mockUrl: IUrlDocument = {
        _id: id,
        name: "test Url",
        url: "https://test-Url.com",
        certLocation: "/path/to/cert",
      } as IUrlDocument;
      mockUrlService.getUrlById.mockResolvedValueOnce(mockUrl);

      await UrlController.getUrl(req as unknown as Request<IParamsId>, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUrl);
    });

    it("should return a 500 error if an error occurs", async () => {
      mockUrlService.getUrlById.mockRejectedValueOnce(
        new Error("Unexpected error")
      );

      await UrlController.getUrl(req as unknown as Request<IParamsId>, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: "Error getting Url",
      });
    });
  });

  describe(".getAllUrls()", () => {
    it("should return a 200 response with all Urls", async () => {
      const mockUrls: IUrlDocument[] = [
        {
          _id: "1",
          name: "test Url",
          url: "https://test-Url.com",
          certLocation: "/path/to/cert",
        },
        {
          _id: "2",
          name: "test Url2",
          url: "https://test-Url-2.com",
          certLocation: "/path/to/other/cert",
        },
      ] as IUrlDocument[];
      mockUrlService.getAllUrls.mockResolvedValueOnce(mockUrls);

      await UrlController.getAllUrls(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUrls);
    });

    it("should return a 500 error if an error occurs", async () => {
      mockUrlService.getAllUrls.mockRejectedValueOnce(
        new Error("Unexpected error")
      );

      await UrlController.getAllUrls(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: "Error getting Urls",
      });
    });
  });
});
