import { IValidator, ValidatorUtil } from "corevalidationjs";

export const validatorAdapter = (
  validator: (value: any, options: any) => boolean,
  message?: (name: string, rules: any) => string,
): IValidator => ValidatorUtil.createValidator({ validate: validator, message });
