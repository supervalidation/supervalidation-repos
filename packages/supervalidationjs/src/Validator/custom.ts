import { IValidator, IValidateDescription, ValidatorUtil } from "corevalidationjs";

export const custom: <Rules = any, AttributeValue = any, Extension = any, Aggregate = { [key: string]: any; }>(validator: {
  validate: (value: AttributeValue, rules: Rules, aggregate: Aggregate, ext: Extension, descriptions: IValidateDescription[]) => boolean | string;
  message?: (name: string, rules: Rules, validateResult: boolean | string) => string;
}) => IValidator<Rules, AttributeValue, Extension, Aggregate> = (validator) =>
    ValidatorUtil.createValidator(validator);
