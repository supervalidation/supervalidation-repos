import { IValidator } from "corevalidationjs";

export type inStringLengthRules = number | {
  min?: number;
  max?: number;
};

export const inStringLength: IValidator<inStringLengthRules> = {
  message: (name, rules) => {
    let error = `[${name}] is invalid`;
    let min = -1;
    let max = -1;

    if (typeof rules === "number") {
      max = rules;
    } else {
      min = rules.min || min;
      max = rules.max || max;
    }

    if (min > 0) {
      error += `, greater than or equal to '${min}'`;
    }

    if (max > 0) {
      error += `, less than or equal to '${max}'`;
    }

    error += ".";

    return error;
  },
  validate: (value, rules) => {
    if (value) {
      if (typeof value === "string") {
        let min = -1;
        let max = -1;

        if (typeof rules === "number") {
          max = rules;
        } else {
          min = rules.min || min;
          max = rules.max || max;
        }

        if (min > 0 && value.length < min) {
          return false;
        }

        if (max > 0 && value.length > max) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  },
};
