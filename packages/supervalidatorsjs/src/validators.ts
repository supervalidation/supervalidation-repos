import { inEmailFormat } from "./inEmailFormat";
import { isRequired } from "./isRequired";
import { typeOf } from "./typeOf";

const Validators = {
  inEmailFormat,
  isRequired,
  typeOf,
};

module.exports = Validators;

Object.freeze(Validators);
