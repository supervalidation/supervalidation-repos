import { IValidateDescription } from "./IValidateDescription";

export type RulesValue = null | string | number | boolean | string[] | number[] | boolean[];

export interface IValidatorOptions<Rules = any> {
  rules: any;
  message?: (name: string, rules: Rules, validateResult: boolean | string) => string;
  validate?: (value: any, rules: Rules, aggregate: any, ext: any, descriptions: IValidateDescription[]) => boolean | string;
  ext?: any;
}

export interface IConstraint {
  [validator: string]: IValidatorOptions | RulesValue;
}

export interface IConstraints {
  [name: string]: IConstraint | IConstraints;
}
