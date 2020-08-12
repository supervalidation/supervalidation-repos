import { ConstraintsUtil } from "./ConstraintsUtil";
import { FailedValidateError } from "./Errors/FailedValidateError";
import { UndefinedValidatorError } from "./Errors/UndefinedValidatorError";
import { IConstraint, IConstraints } from "./IConstraints";
import { IValidateDescription } from "./IValidateDescription";
import { IValidationResult } from "./IValidationResult";
import { IValidator } from "./IValidator";
import { ValidatorUtil } from "./ValidatorUtil";
import { InvalidationsFlatter } from "./InvalidationFlatter";

export interface IValidateOptions {
  format?: "flat" | "detail" | "exception";
}

const describe = (attributes: object, constraints: IConstraints) => describeConstraints(attributes, constraints, []);

const describeConstraints = (
  attributes: object = {},
  constraints: IConstraints,
  initial: IValidateDescription[],
): IValidateDescription[] => Object.keys(constraints).reduce((result, key) => {
  const value = attributes[key];

  if (ConstraintsUtil.isConstraint(constraints[key])) {
    const constraint = constraints[key] as IConstraint;

    Object.keys(constraint)
      .map((validator) => ({
        attribute: { key, value },
        validator,
        ...ConstraintsUtil.resolveValidatorOptions(constraint[validator]),
      }))
      .forEach((each) => result.push(each));

    return result;
  } else {
    return describeConstraints(attributes[key], constraints[key] as IConstraints, result);
  }
}, initial);

const validate = (
  attributes: object,
  constraints: IConstraints,
  validators: { [name: string]: IValidator; },
  options: IValidateOptions = {},
): IValidationResult => {
  const { format = "detail" } = options;
  const descriptions = describe(attributes, constraints);
  const invalidAttributes = validateAttributes(attributes, constraints, validators, descriptions, attributes);

  if (invalidAttributes === undefined) {
    return { isValid: true };
  } else {
    if (format === "exception") {
      throw new FailedValidateError(invalidAttributes);
    } else if (format === "flat") {
      return { isValid: false, invalidAttributes: InvalidationsFlatter(invalidAttributes) };
    } else {
      return { isValid: false, invalidAttributes };
    }
  }
};

const validateAttributes = (
  attributes: object,
  constraints: IConstraints,
  validators: { [name: string]: IValidator; },
  descriptions: IValidateDescription[],
  aggregate?: object,
): { [property: string]: any; } | undefined => {
  const aggregated = aggregate || attributes;

  const reduced = Object.keys(constraints).reduce((result, name) => {
    const value = attributes[name];
    const constraint = constraints[name];

    if (ConstraintsUtil.isConstraint(constraint)) {
      const invalid = validateValue(name, value, constraint as IConstraint, validators, descriptions, aggregated);

      if (invalid !== undefined) {
        result[name] = invalid;
      }
    } else {
      const invalid = validateAttributes(value || {}, constraint as IConstraints, validators, descriptions, aggregated);

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
  descriptions: IValidateDescription[],
  aggregate?: object,
): { [name: string]: string; } | undefined => {
  const aggregated = aggregate || { [name]: value };

  const reduced = Object.keys(constraint).reduce((result: { [name: string]: string; }, key) => {
    const values = constraint[key];
    const opts = ConstraintsUtil.resolveValidatorOptions(values);
    const validator = validators[key] || {};
    const Validate = opts.validate || validator.validate;

    if (Validate === undefined) {
      throw new UndefinedValidatorError(key);
    }

    const validateResult = Validate(value, opts.rules, aggregated, opts.ext, descriptions);

    if (validateResult !== true) {
      const message = opts.message || validator.message || ValidatorUtil.defaultMessage;
      result[key] = message(name, opts.rules, validateResult);
    }

    return result;
  }, {});

  return Object.keys(reduced).length === 0 ? undefined : reduced;
};

export const ValidationUtil = {
  describe,
  validate,
  validateAttributes,
  validateValue,
};

Object.freeze(ValidationUtil);
