import { expect } from "chai";
import { IConstraints, ValidationUtil } from "corevalidationjs";
import { either, eitherRules } from "./index";

describe("either.ts tests", () => {
  describe("#either validator", () => {
    it("expect to validate a valid result, #1", async () => {
      // arranges
      const attributes = {
        valueA: "1234567890",
      };
      const constraints: IConstraints = {
        valueA: {
          either: {
            rules: {
              key: "AB",
            },
          },
        },
        valueB: {
          either: {
            rules: {
              key: "AB",
            },
          },
        },
      };
      const validators = {
        either,
      };
      const expected = {
        isValid: true,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
