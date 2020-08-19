import { either } from "./either";
import { inEmailFormat } from "./inEmailFormat";
import { inStringLength } from "./inStringLength";
import { isRequired } from "./isRequired";
import { oneOf } from "./oneOf";
import { typeOf } from "./typeOf";

export { adapters } from "./adapters";
export { either, eitherRules } from "./either";
export { inEmailFormat, inEmailFormatRules } from "./inEmailFormat";
export { inStringLength, inStringLengthRules } from "./inStringLength";
export { isRequired, isRequiredRules } from "./isRequired";
export { oneOf, oneOfRules } from "./oneOf";
export { typeOf, typeOfRules } from "./typeOf";

export const Validators = {
  either,
  inEmailFormat,
  inStringLength,
  isRequired,
  oneOf,
  typeOf,
};

export default Validators;

Object.freeze(Validators);
