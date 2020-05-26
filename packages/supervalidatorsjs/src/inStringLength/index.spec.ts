import { expect } from "chai";
import { IConstraints, ValidationUtil } from "corevalidationjs";
import { inStringLength } from "./index";

describe("inStringLength.ts tests", () => {
  describe("#inStringLength validator", () => {
    it("expect to validate a valid result, #1", async () => {
      // arranges
      const attributes = {
        value: "1234567890",
      };
      const constraints: IConstraints = {
        value: {
          inStringLength: {
            rules: 10,
          },
        },
      };
      const validators = {
        inStringLength,
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
        value: {
          inStringLength: {
            rules: 10,
          },
        },
      };
      const validators = {
        inStringLength,
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
      const attributes = {
        value: "",
      };
      const constraints: IConstraints = {
        value: {
          inStringLength: {
            rules: 10,
          },
        },
      };
      const validators = {
        inStringLength,
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
        value: "1234567890",
      };
      const constraints: IConstraints = {
        value: {
          inStringLength: {
            rules: {
              min: 0,
              max: 5,
            },
          },
        },
      };
      const validators = {
        inStringLength,
      };
      const expected = {
        invalidAttributes: {
          value: {
            inStringLength: "[value] is invalid, less than or equal to '5'.",
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
        value: "1234567890",
      };
      const constraints: IConstraints = {
        value: {
          inStringLength: {
            rules: 5,
          },
        },
      };
      const validators = {
        inStringLength,
      };
      const expected = {
        invalidAttributes: {
          value: {
            inStringLength: "[value] is invalid, less than or equal to '5'.",
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
        value: "123",
      };
      const constraints: IConstraints = {
        value: {
          inStringLength: {
            rules: {
              min: 5,
              max: 10,
            },
          },
        },
      };
      const validators = {
        inStringLength,
      };
      const expected = {
        invalidAttributes: {
          value: {
            inStringLength: "[value] is invalid, greater than or equal to '5', less than or equal to '10'.",
          },
        },
        isValid: false,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate an invalid result, #4", async () => {
      // arranges
      const attributes = {
        value: "123",
      };
      const constraints: IConstraints = {
        value: {
          inStringLength: {
            rules: {
              min: 5,
            },
          },
        },
      };
      const validators = {
        inStringLength,
      };
      const expected = {
        invalidAttributes: {
          value: {
            inStringLength: "[value] is invalid, greater than or equal to '5'.",
          },
        },
        isValid: false,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate an invalid result, #5", async () => {
      // arranges
      const attributes = {
        value: 123,
      };
      const constraints: IConstraints = {
        value: {
          inStringLength: {
            rules: {
              min: 0,
            },
          },
        },
      };
      const validators = {
        inStringLength,
      };
      const expected = {
        invalidAttributes: {
          value: {
            inStringLength: "[value] is invalid.",
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
