import { IValidator } from "corevalidationjs";

export const custom: <Rules = any, AttributeValue = any, Extension = any, Aggregate = { [key: string]: any; }>(validator: {
  validate: (value: AttributeValue, rules: Rules, aggregate: Aggregate, ext: Extension) => boolean;
  message?: (name: string, rules: Rules) => string;
}) => IValidator<Rules, AttributeValue, Extension, Aggregate> = (validator) => {
  const { validate, message = (name) => `[${name}] is invalid.` } = validator;
  return { message, validate };
};
