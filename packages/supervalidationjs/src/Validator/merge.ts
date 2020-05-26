import { IValidator } from "corevalidationjs";

export const merge = (
  validators: { [name: string]: IValidator; },
  ...extValidators: { [name: string]: IValidator; }[]
) => extValidators.reduce((merged, each) => {
  merged = Object.keys(each).reduce((result, key) => {
    result[key] = each[key];
    return result;
  }, merged);

  return merged;
}, { ...validators });
