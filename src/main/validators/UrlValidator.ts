import { IUrlValidator } from "@interfaces/index";
import Joi from "joi";
import { Service } from "typedi";

@Service()
export default class UrlValidator implements IUrlValidator {
  validateCreateUrlInput(input: object): void {
    const schema = Joi.object({
      name: Joi.string().required().min(2),
      url: Joi.string().required().uri(),
      certLocation: Joi.string(),
    });
    const { error } = schema.validate(input);
    if (error) {
      throw error;
    }
  }
}
