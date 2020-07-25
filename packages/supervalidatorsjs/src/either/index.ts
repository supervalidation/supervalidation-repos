import { IValidator } from "corevalidationjs";

export type eitherRules = {
  props: string[];
};

export const either: IValidator<eitherRules> = {
  message: (name, rules) => {
    return "";
  },
  validate: (value, rules, aggregate, ext) => {
    return false;
  },
};
