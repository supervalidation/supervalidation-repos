import { IValidator } from "corevalidationjs";

export type eitherRules = {
  key: string;
};

export const either: IValidator<eitherRules> = {
  message: (name, rules) => `[${name}] is invalid.`,
  validate: (value, rules, aggregate, ext, descriptions) => {
    const key = rules.key;
    const filtered = descriptions.filter((each) => ((each.validator === "either") && (each.rules.key === key) && each.attribute.value));

    return filtered.length === 1;
  },
};
