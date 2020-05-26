export type RulesValue = null | string | number | boolean | string[] | number[] | boolean[];

export interface IValidatorOptions {
  rules: any;
  message?: (name: string, rules: any) => string;
  validate?: (value: any, rules: any) => boolean;
  ext?: any;
}

export interface IConstraint {
  [validator: string]: IValidatorOptions | RulesValue;
}

export interface IConstraints {
  [name: string]: IConstraint | IConstraints;
}
