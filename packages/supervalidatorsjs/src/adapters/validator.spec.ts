import { expect } from "chai";
import { IConstraints, ValidationUtil } from "corevalidationjs";
import Validator from "validator";
import { validatorAdapter } from "./validator";

describe("adapters/validator.ts tests", () => {
  describe("#validatorAdapter()", () => {
    it("expect to adapt a validator", async () => {
      // arranges

      // acts
      const result = validatorAdapter(Validator.isEmail);

      // asserts
      expect(result).not.to.equal(null);
      expect(result).not.to.equal(undefined);
      expect(result.message).not.to.equal(null);
      expect(result.message).not.to.equal(undefined);
      expect(result.validate).not.to.equal(null);
      expect(result.validate).not.to.equal(undefined);
    });

    it("expect to validate a valid result", async () => {
      // arranges
      const attributes = {
        email: "one@email.com",
      };
      const constraints: IConstraints = {
        email: {
          isEmail: {
            rules: {},
          },
        },
      };
      const validators = {
        isEmail: validatorAdapter(Validator.isEmail),
      };
      const expected = {
        isValid: true,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate an invalid result", async () => {
      // arranges
      const attributes = {
        email: "one",
      };
      const constraints: IConstraints = {
        email: {
          isEmail: {
            rules: {},
          },
        },
      };
      const validators = {
        isEmail: validatorAdapter(Validator.isEmail),
      };
      const expected = {
        invalidAttributes: {
          email: {
            isEmail: "[email] is invalid.",
          },
        },
        isValid: false,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
