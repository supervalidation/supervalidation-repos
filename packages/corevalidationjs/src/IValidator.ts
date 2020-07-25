import { IValidateDescription } from "./IValidateDescription";

export interface IValidator<Rules = any, AttributeValue = any, Extension = any, Aggregate = { [key: string]: any; }> {
  message: (
    name: string,
    rules: Rules,
    validateResult: boolean | string,
  ) => string;
  validate: (
    value: AttributeValue,
    rules: Rules,
    aggregate: Aggregate,
    ext: Extension,
    descriptions: IValidateDescription[],
  ) => boolean | string;
}
