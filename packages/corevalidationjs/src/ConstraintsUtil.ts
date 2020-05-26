import { isNullOrUndefined } from "util";
import { InvalidConstraintError } from "./Errors/InvalidConstraintError";
import { IValidatorOptions, RulesValue } from "./IConstraints";

const isConstraint = (obj: object): boolean => {
  let stage: boolean | undefined;

  const keys = Object.keys(obj);
  keys.forEach((key) => {
    const values = obj[key];
    const chk = isValidatorOptions(values) || isRulesValues(values);

    if (stage === undefined) {
      stage = chk;
    } else if (stage !== chk) {
      throw new InvalidConstraintError();
    }
  });

  return stage === undefined ? true : stage;
};

const isNestedAttributes = (values: any): boolean => {
  if (isValidatorOptions(values) || isRulesValues(values)) {
    return false;
  } else {
    return true;
  }
};

const isRulesValues = (values: any): boolean => {
  if (values === undefined || values === null) {
    return true;
  }

  if (Array.isArray(values)) {
    return true;
  }

  const type = typeof values;

  if (type === "string" || type === "number" || type === "boolean") {
    return true;
  }

  return false;
};

const isValidatorOptions = (values: any): boolean => {
  if (typeof values === "object" && !isNullOrUndefined(values) && !isNullOrUndefined(values.rules)) {
    return true;
  } else {
    return false;
  }
};

const resolveValidatorOptions = (values: IValidatorOptions | RulesValue): IValidatorOptions => {
  if (isValidatorOptions(values)) {
    return values as IValidatorOptions;
  } else {
    return {
      rules: values,
    };
  }
};

export const ConstraintsUtil = {
  isConstraint,
  isNestedAttributes,
  isRulesValues,
  isValidatorOptions,
  resolveValidatorOptions,
};

Object.freeze(ConstraintsUtil);
