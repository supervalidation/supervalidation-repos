import { IValidator } from "corevalidationjs";

export const custom: <Rule = any, AttributeValue = any, Extension = any, Aggregate = { [key: string]: any; }>(validator: {
  validate: (value: AttributeValue, rules: Rule, aggregate: Aggregate, ext: Extension) => boolean;
  message?: (name: string, rules: Rule) => string;
}) => IValidator<Rule, AttributeValue, Extension, Aggregate> = (validator) => {
  const { validate, message = (name) => `[${name}] is invalid.` } = validator;
  return { message, validate };
};
