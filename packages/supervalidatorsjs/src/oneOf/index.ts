import { IValidator } from "corevalidationjs";

export type oneOfRules = string[];

export const oneOf: IValidator<oneOfRules, string> = {
  message: (name, rules) =>
    `[${name}] must be in [${rules.join(" | ")}].`,
  validate: (value, rules) => {
    if (value) {
      return rules.indexOf(value) > -1;
    } else {
      return true;
    }
  },
};
