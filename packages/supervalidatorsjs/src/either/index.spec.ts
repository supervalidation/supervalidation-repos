import { expect } from "chai";
import { IConstraints, ValidationUtil } from "corevalidationjs";
import { either } from "./index";

describe("either.ts tests", () => {
  describe("#either validator", () => {
    it("expect to validate a valid result", async () => {
      // arranges
      const attributes = {
        valueA: "1234567890",
        valueC: "1234567890",
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
        valueC: {
          either: {
            rules: {
              key: "C",
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

    it("expect to validate an invalid result", async () => {
      // arranges
      const attributes = {
        valueA: "111",
        valueB: "222",
        valueC: "333",
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
        valueC: {
          either: {
            rules: {
              key: "C",
            },
          },
        },
      };
      const validators = {
        either,
      };
      const expected = {
        isValid: false,
        invalidAttributes: {
          valueA: {
            either: "either [valueA | valueB] is invalid.",
          },
          valueB: {
            either: "either [valueA | valueB] is invalid.",
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
