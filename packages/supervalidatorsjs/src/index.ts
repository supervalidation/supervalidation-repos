import { inEmailFormat } from "./inEmailFormat";
import { inStringLength } from "./inStringLength";
import { isRequired } from "./isRequired";
import { typeOf } from "./typeOf";

export { adapters } from "./adapters";
export { inEmailFormat, inEmailFormatRules } from "./inEmailFormat";
export { inStringLength, inStringLengthRules } from "./inStringLength";
export { isRequired, isRequiredRules } from "./isRequired";
export { typeOf, typeOfRules } from "./typeOf";

export const Validators = {
  inEmailFormat,
  inStringLength,
  isRequired,
  typeOf,
};

export default Validators;

Object.freeze(Validators);
