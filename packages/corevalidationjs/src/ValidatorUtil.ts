import { IValidator } from "./IValidator";

const defaultMessage = (name: string) => `[${name}] is invalid.`;
const createValidator = (
  validate: (value: any, rules: any) => boolean,
  message: (name: string, rules: any) => string = defaultMessage,
): IValidator => ({
  message,
  validate,
});

export const ValidatorUtil = {
  createValidator,
  defaultMessage,
};

Object.freeze(ValidatorUtil);
