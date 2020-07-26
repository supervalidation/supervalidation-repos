
import { IValidator } from "./IValidator";
import { IValidateDescription } from "./IValidateDescription";

const defaultMessage = (name: string, rules: any, validateResult: boolean | string) =>
  typeof validateResult === "string" ? validateResult : `[${name}] is invalid.`;

const createValidator = <Rules = any>(options: {
  message?: (name: string, rules: Rules, validateResult: boolean | string) => string;
  validate: (value: any, rules: Rules, aggregate: any, ext: any, descriptions: IValidateDescription[]) => boolean | string;
}): IValidator => ({
  message: options.message || defaultMessage,
  validate: options.validate,
});

export const ValidatorUtil = {
  createValidator,
  defaultMessage,
};

Object.freeze(ValidatorUtil);
