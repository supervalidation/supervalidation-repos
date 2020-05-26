import { expect } from "chai";
import { IConstraints, ValidationUtil } from "corevalidationjs";
import { inEmailFormat } from "./index";

describe("inEmailFormat.ts tests", () => {
  describe("#inEmailFormat validator", () => {
    it("expect to validate a valid result when a value is null or undefined", async () => {
      // arranges
      const attributes = {};
      const constraints: IConstraints = {
        email: {
          inEmailFormat: "*",
        },
      };
      const validators = {
        inEmailFormat,
      };
      const expected = {
        isValid: true,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate a valid result, #1", async () => {
      // arranges
      const attributes = {
        email: "one@email.com",
      };
      const constraints: IConstraints = {
        email: {
          inEmailFormat: "*",
        },
      };
      const validators = {
        inEmailFormat,
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
        email: "one@email.com",
      };
      const constraints: IConstraints = {
        email: {
          inEmailFormat: {
            rules: {
              domain: "*",
            },
          },
        },
      };
      const validators = {
        inEmailFormat,
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
        email: "one@email.tech",
      };
      const constraints: IConstraints = {
        email: {
          inEmailFormat: "email.tech",
        },
      };
      const validators = {
        inEmailFormat,
      };
      const expected = {
        isValid: true,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate a valid result, #4", async () => {
      // arranges
      const attributes = {
        email: "one@email.tech",
      };
      const constraints: IConstraints = {
        email: {
          inEmailFormat: {
            rules: {
              domain: "email.tech",
            },
          },
        },
      };
      const validators = {
        inEmailFormat,
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
        email: "one@email.tech",
      };
      const constraints: IConstraints = {
        email: {
          inEmailFormat: {
            rules: {
              domain: /^(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            },
          },
        },
      };
      const validators = {
        inEmailFormat,
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
        email: "email.com",
      };
      const constraints: IConstraints = {
        email: {
          inEmailFormat: "*",
        },
      };
      const validators = {
        inEmailFormat,
      };
      const expected = {
        invalidAttributes: {
          email: {
            inEmailFormat: "[email] must be in email format.",
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
      };
      const constraints: IConstraints = {
        email: {
          inEmailFormat: "test.tech",
        },
      };
      const validators = {
        inEmailFormat,
      };
      const expected = {
        invalidAttributes: {
          email: {
            inEmailFormat: "[email] must be in email format [domain: test.tech].",
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
      };
      const constraints: IConstraints = {
        email: {
          inEmailFormat: {
            rules: {
              domain: "mail.tech",
            },
          },
        },
      };
      const validators = {
        inEmailFormat,
      };
      const expected = {
        invalidAttributes: {
          email: {
            inEmailFormat: "[email] must be in email format [domain: mail.tech].",
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
        email: "one@email.com",
      };
      const constraints: IConstraints = {
        email: {
          inEmailFormat: {
            rules: {
              domain: /^@/i,
            },
          },
        },
      };
      const validators = {
        inEmailFormat,
      };
      const expected = {
        invalidAttributes: {
          email: {
            inEmailFormat: "[email] must be in email format.",
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
