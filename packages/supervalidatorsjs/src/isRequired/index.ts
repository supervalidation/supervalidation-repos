import { IValidator } from "corevalidationjs";
import { isNullOrUndefined } from "util";

export type isRequiredRules = boolean;

export const isRequired: IValidator<isRequiredRules> = {
  message: (name) => `[${name}] is required.`,
  validate: (value, rules) => {
    if (rules === false) {
      return true;
    } else {
      return !isNullOrUndefined(value);
    }
  },
};
