import { ConstraintsUtil } from "./ConstraintsUtil";
import { UndefinedValidatorError } from "./Errors/UndefinedValidatorError";
import { IConstraint, IConstraints } from "./IConstraints";
import { IValidationResult } from "./IValidationResult";
import { IValidator } from "./IValidator";
import { ValidatorUtil } from "./ValidatorUtil";

const validate = (
  attributes: object,
  constraints: IConstraints,
  validators: { [name: string]: IValidator; },
): IValidationResult => {
  const invalidAttributes = validateAttributes(attributes, constraints, validators, attributes);

  if (invalidAttributes === undefined) {
    return { isValid: true };
  } else {
    return { isValid: false, invalidAttributes };
  }
};

const validateAttributes = (
  attributes: object,
  constraints: IConstraints,
  validators: { [name: string]: IValidator; },
  aggregate?: object,
): { [property: string]: any; } | undefined => {
  const aggregated = aggregate || attributes;

  const reduced = Object.keys(constraints).reduce((result, name) => {
    const value = attributes[name];
    const constraint = constraints[name];

    if (ConstraintsUtil.isConstraint(constraint)) {
      const invalid = validateValue(name, value, constraint as IConstraint, validators, aggregated);

      if (invalid !== undefined) {
        result[name] = invalid;
      }
    } else {
      const invalid = validateAttributes(value || {}, constraint as IConstraints, validators, aggregated);

      if (invalid !== undefined) {
        result[name] = invalid;
      }
    }

    return result;
  }, {});

  return Object.keys(reduced).length === 0 ? undefined : reduced;
};

const validateValue = (
  name: string,
  value: any,
  constraint: IConstraint,
  validators: { [name: string]: IValidator; },
  aggregate?: object,
): { [name: string]: string; } | undefined => {
  const aggregated = aggregate || { [name]: value };

  const reduced = Object.keys(constraint).reduce((result: { [name: string]: string; }, key) => {
    const values = constraint[key];
    const opts = ConstraintsUtil.resolveValidatorOptions(values);
    const validator = opts.validate ? ValidatorUtil.createValidator(opts.validate, opts.message) : validators[key];

    if (validator === undefined) {
      throw new UndefinedValidatorError(key);
    }

    if (!validator.validate(value, opts.rules, aggregated, opts.ext)) {
      const message = opts.message || validator.message || ValidatorUtil.defaultMessage;
      result[key] = message(name, opts.rules);
    }

    return result;
  }, {});

  return Object.keys(reduced).length === 0 ? undefined : reduced;
};

export const ValidationUtil = {
  validate,
  validateAttributes,
  validateValue,
};

Object.freeze(ValidationUtil);
