import { expect } from "chai";
import { IConstraints, ValidationUtil } from "corevalidationjs";
import { isRequired } from "./index";

describe("isRequired.ts tests", () => {
  describe("#isRequired validator", () => {
    it("expect to validate a valid result, #1", async () => {
      // arranges
      const attributes = {
        email: "one@email.com",
      };
      const constraints: IConstraints = {
        email: {
          isRequired: {
            rules: true,
          },
        },
      };
      const validators = {
        isRequired,
      };
      const expected = {
        isValid: true,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate a valid result, #2", async () => {
      // arranges
      const attributes = {};
      const constraints: IConstraints = {
        email: {
          isRequired: false,
        },
      };
      const validators = {
        isRequired,
      };
      const expected = {
        isValid: true,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate an invalid result, #1", async () => {
      // arranges
      const attributes = {
        email: "one@email.com",
      };
      const constraints: IConstraints = {
        email: {
          isRequired: true,
        },
        name: {
          isRequired: true,
        },
      };
      const validators = {
        isRequired,
      };
      const expected = {
        invalidAttributes: {
          name: {
            isRequired: "[name] is required.",
          },
        },
        isValid: false,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate an invalid result, #2", async () => {
      // arranges
      const attributes = {
        email: "one@email.com",
        name: undefined,
      };
      const constraints: IConstraints = {
        email: {
          isRequired: true,
        },
        name: {
          isRequired: true,
        },
      };
      const validators = {
        isRequired,
      };
      const expected = {
        invalidAttributes: {
          name: {
            isRequired: "[name] is required.",
          },
        },
        isValid: false,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate an invalid result, #3", async () => {
      // arranges
      const attributes = {
        email: "one@email.com",
        name: null,
      };
      const constraints: IConstraints = {
        email: {
          isRequired: true,
        },
        name: {
          isRequired: true,
        },
      };
      const validators = {
        isRequired,
      };
      const expected = {
        invalidAttributes: {
          name: {
            isRequired: "[name] is required.",
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
