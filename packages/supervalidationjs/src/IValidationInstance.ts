import {
  IConstraints,
  IValidationResult,
  IValidator,
  IValidateOptions,
} from "corevalidationjs";

export interface IValidationInstance {
  getValidator: (name: string) => IValidator;
  setValidator: (name: string, validator: IValidator) => void;
  validate: (attributes: object, constraints: IConstraints, options?: IValidateOptions) => IValidationResult;
}
