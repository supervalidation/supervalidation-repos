import { expect } from "chai";
import { IConstraints, ValidationUtil } from "corevalidationjs";
import { typeOf } from "./index";

describe("typeOf.ts tests", () => {
  describe("#typeOf validator", () => {
    it("expect to validate a valid result, #1", async () => {
      // arranges
      const attributes = {
        value: "any values",
      };
      const constraints: IConstraints = {
        value: {
          typeOf: "string",
        },
      };
      const validators = {
        typeOf,
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
      const attributes = {
        value: 0,
      };
      const constraints: IConstraints = {
        value: {
          typeOf: "number",
        },
      };
      const validators = {
        typeOf,
      };
      const expected = {
        isValid: true,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate a valid result, #3", async () => {
      // arranges
      const attributes1 = {
        value: 0,
      };
      const attributes2 = {
        value: "any values",
      };
      const constraints: IConstraints = {
        value: {
          typeOf: ["string", "number"],
        },
      };
      const validators = {
        typeOf,
      };
      const expected = {
        isValid: true,
      };

      // acts
      const result1 = ValidationUtil.validate(attributes1, constraints, validators);
      const result2 = ValidationUtil.validate(attributes2, constraints, validators);

      // asserts
      expect(result1).to.deep.equal(expected);
      expect(result2).to.deep.equal(expected);
    });

    it("expect to validate a valid result, #4", async () => {
      // arranges
      const attributes = {
        value: [],
      };
      const constraints: IConstraints = {
        value: {
          typeOf: ["string", "array"],
        },
      };
      const validators = {
        typeOf,
      };
      const expected = {
        isValid: true,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate a valid result, #5", async () => {
      // arranges
      const attributes = {
        value: {},
      };
      const constraints: IConstraints = {
        value: {
          typeOf: ["string", "object"],
        },
      };
      const validators = {
        typeOf,
      };
      const expected = {
        isValid: true,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate a valid result, #6", async () => {
      // arranges
      const attributes = {};
      const constraints: IConstraints = {
        value: {
          typeOf: ["string", "number"],
        },
      };
      const validators = {
        typeOf,
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
        value: "any value",
      };
      const constraints: IConstraints = {
        value: {
          typeOf: "number",
        },
      };
      const validators = {
        typeOf,
      };
      const expected = {
        invalidAttributes: {
          value: {
            typeOf: "[value] must be a type of [number].",
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
        value: [],
      };
      const constraints: IConstraints = {
        value: {
          typeOf: "object",
        },
      };
      const validators = {
        typeOf,
      };
      const expected = {
        invalidAttributes: {
          value: {
            typeOf: "[value] must be a type of [object].",
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
        value: 0,
      };
      const constraints: IConstraints = {
        value: {
          typeOf: ["string", "object"],
        },
      };
      const validators = {
        typeOf,
      };
      const expected = {
        invalidAttributes: {
          value: {
            typeOf: "[value] must be a type of [string, object].",
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
