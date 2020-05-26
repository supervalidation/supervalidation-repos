import { expect } from "chai";
import { UndefinedValidatorError } from "./UndefinedValidatorError";

describe("UndefinedValidatorError.ts", () => {
  describe("#UndefinedValidatorError()", () => {
    it("expect to create an instance of UndefinedValidatorError", () => {
      // arranges
      const validator = "test.validator";

      // acts
      const error = new UndefinedValidatorError(validator);

      // asserts
      expect(error.name).to.equal("UndefinedValidatorError");
      expect(error.validator).to.equal("test.validator");
      expect(error.message).to.equal("[test.validator] - UNDEFINED VALIDATOR");
    });
  });
});
