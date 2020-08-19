import { expect } from "chai";
import { IConstraints, ValidationUtil } from "corevalidationjs";
import { oneOf } from "./index";

describe("oneOf.ts tests", () => {
  describe("#oneOf validator", () => {
    it("expect to validate a valid result", async () => {
      // arranges
      const attributes = {
        value: "A",
      };
      const constraints: IConstraints = {
        value: {
          oneOf: ["A", "B"],
        },
      };
      const validators = {
        oneOf,
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
        value: "C",
      };
      const constraints: IConstraints = {
        value: {
          oneOf: ["A", "B"],
        },
      };
      const validators = {
        oneOf,
      };
      const expected = {
        isValid: false,
        invalidAttributes: {
          value: {
            oneOf: "[value] must be in [A | B].",
          },
        },
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
