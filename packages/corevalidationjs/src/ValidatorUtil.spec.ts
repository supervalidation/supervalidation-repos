import { expect } from "chai";
import { ValidatorUtil } from "./ValidatorUtil";

describe("ValidatorUtil.ts", () => {
  describe("#ValidatorUtil.defaultMessage()", () => {
    it("expect to get a default message", () => {
      // arranges
      const expected = "[test] is invalid.";

      // acts
      const result = ValidatorUtil.defaultMessage("test");

      // asserts
      expect(result).to.equal(expected);
    });
  });

  describe("#ValidatorUtil.createValidator()", () => {
    it("expect to create a validator, #1", () => {
      // arranges
      const validate: any = {};
      const message: any = {};

      const expected = { validate, message };

      // acts
      const result = ValidatorUtil.createValidator(validate, message);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to create a validator, #2", () => {
      // arranges
      const validate: any = {};

      const expected = { validate, message: ValidatorUtil.defaultMessage };

      // acts
      const result = ValidatorUtil.createValidator(validate);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
