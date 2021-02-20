import { either } from "./either";
import { inEmailFormat } from "./inEmailFormat";
import { inStringLength } from "./inStringLength";
import { isRequired } from "./isRequired";
import { oneOf } from "./oneOf";
import { typeOf } from "./typeOf";

const Validators = {
  either,
  inEmailFormat,
  inStringLength,
  isRequired,
  oneOf,
  typeOf,
};

module.exports = Validators;

Object.freeze(Validators);
