import { IValidator } from "corevalidationjs";

export type typeOfRules = string | string[];

export const typeOf: IValidator<string | string[]> = {
  message: (name, rules) => Array.isArray(rules) ?
    `[${name}] must be a type of [${rules.join(", ")}].` :
    `[${name}] must be a type of [${rules}].`,
  validate: (value, rules) => {
    if (value === undefined) {
      return true;
    }

    const Rules = Array.isArray(rules) ? rules : [rules];
    const valueType = Array.isArray(value) ? "array" : typeof value;

    return (Rules.indexOf(valueType) > -1);
  },
};
