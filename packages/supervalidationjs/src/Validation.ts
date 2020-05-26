import {
  IConstraints,
  IValidator,
  ValidationUtil,
} from "corevalidationjs";
import { IValidationInstance } from "./IValidationInstance";

export const Validation = {
  getInstance: (validators?: { [name: string]: IValidator; }): IValidationInstance =>
    ((Validators: { [name: string]: IValidator; } = {}) => ({
      getValidator: (name: string) => Validators[name],
      setValidator: (name: string, validator: IValidator) => Validators[name] = validator,
      validate: (attributes: object, constraints: IConstraints) =>
        ValidationUtil.validate(attributes, constraints, Validators),
    }))(validators),
};

Object.freeze(Validation);
