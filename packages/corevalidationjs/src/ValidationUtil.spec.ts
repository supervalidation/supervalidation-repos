import { expect } from "chai";
import { isNullOrUndefined } from "util";
import { IConstraint } from "./IConstraints";
import { IValidator } from "./IValidator";
import { ValidationUtil } from "./ValidationUtil";
// import { FailedValidateError } from "./Errors/FailedValidateError";

const validators: { [validator: string]: IValidator } = {
  alwaysInvalid: {
    message: () => "This is always invalid.",
    validate: () => false,
  },
  isRequired: {
    message: (name) => `The ${name} is required.`,
    validate: (value) => !isNullOrUndefined(value),
  },
};

describe("ValidationUtil.ts", () => {
  describe("#ValidationUtil.validateValue()", () => {
    it("expect to validate valid attributes", () => {
      // arranges
      // TODO
      const name = "email";
      const value = "one@email.com";
      const constraint: IConstraint = {
        isRequired: true,
      };

      // acts
      const act = () => ValidationUtil.validateValue(name, value, constraint, {});

      // asserts
      expect(act).to.throw(Error, "UNDEFINED VALIDATOR");
    });

    it("expect to validate a valid value", () => {
      // arranges
      const name = "email";
      const value = "one@email.com";
      const constraint: IConstraint = {
        isRequired: true,
      };

      // acts
      const result = ValidationUtil.validateValue(name, value, constraint, validators);

      // asserts
      expect(result).to.equal(undefined);
    });

    it("expect to validate an invalid value, #1", () => {
      // arranges
      const name = "email";
      const value = undefined;
      const constraint: IConstraint = {
        alwaysInvalid: true,
        isRequired: true,
      };
      const expected = {
        alwaysInvalid: "This is always invalid.",
        isRequired: "The email is required.",
      };

      // acts
      const result = ValidationUtil.validateValue(name, value, constraint, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate an invalid value, #2", () => {
      // arranges
      const name = "email";
      const value = undefined;
      const constraint: IConstraint = {
        alwaysInvalid: {
          message: () => "It is always invalid.",
          rules: true,
        },
        isRequired: {
          rules: true,
        },
      };
      const expected = {
        alwaysInvalid: "It is always invalid.",
        isRequired: "The email is required.",
      };

      // acts
      const result = ValidationUtil.validateValue(name, value, constraint, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to get a default message", () => {
      // arranges
      const name = "email";
      const value = undefined;
      const constraint: IConstraint = {
        isRequired: {
          rules: true,
        },
      };
      const arragedValidators: any = {
        isRequired: {
          validate: () => false,
        },
      };
      const expected = {
        isRequired: "[email] is invalid.",
      };

      // acts
      const result = ValidationUtil.validateValue(name, value, constraint, arragedValidators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate an invalid value with specified validate, #1", () => {
      // arranges
      const name = "email";
      const value = "one@email.com";
      const constraint: IConstraint = {
        provided: {
          message: () => "It's super validation.",
          rules: true,
          validate: () => false,
        },
      };
      const expected = {
        provided: "It's super validation.",
      };

      // acts
      const result = ValidationUtil.validateValue(name, value, constraint, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate an invalid value with specified validate, #2", () => {
      // arranges
      const name = "email";
      const value = "one@email.com";
      const constraint: IConstraint = {
        provided: {
          rules: true,
          validate: () => false,
        },
      };
      const expected = {
        provided: "[email] is invalid.",
      };

      // acts
      const result = ValidationUtil.validateValue(name, value, constraint, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });

  describe("#ValidationUtil.validateAttributes()", () => {
    it("expect to validate valid attributes, #1", () => {
      // arranges
      const attributes = {
        email: "one@email.com",
        name: "test",
      };
      const constraints = {
        email: {
          isRequired: true,
        },
      };

      // acts
      const result = ValidationUtil.validateAttributes(attributes, constraints, validators);

      // asserts
      expect(result).to.equal(undefined);
    });

    it("expect to validate valid attributes, #2", () => {
      // arranges
      const attributes = {
        email: "one@email.com",
        name: {
          fname: "first name",
          lname: "last name",
        },
      };
      const constraints = {
        email: {
          isRequired: true,
        },
        name: {
          fname: {
            isRequired: true,
          },
          lname: {
            isRequired: true,
          },
        },
      };

      // acts
      const result = ValidationUtil.validateAttributes(attributes, constraints, validators);

      // asserts
      expect(result).to.equal(undefined);
    });

    it("expect to validate invalid attributes, #1", () => {
      // arranges
      const attributes = {};
      const constraints = {
        email: {
          isRequired: true,
        },
        name: {
          alwaysInvalid: true,
          isRequired: true,
        },
      };
      const expected = {
        email: {
          isRequired: "The email is required.",
        },
        name: {
          alwaysInvalid: "This is always invalid.",
          isRequired: "The name is required.",
        },
      };

      // acts
      const result = ValidationUtil.validateAttributes(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate invalid attributes, #2", () => {
      // arranges
      const attributes = {
        email: "one@email.com",
        name: "test",
      };
      const constraints = {
        email: {
          isRequired: true,
        },
        name: {
          alwaysInvalid: true,
          isRequired: true,
        },
      };
      const expected = {
        name: {
          alwaysInvalid: "This is always invalid.",
        },
      };

      // acts
      const result = ValidationUtil.validateAttributes(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate invalid attributes, #3", () => {
      // arranges
      const attributes = {
        email: "one@email.com",
        name: "test",
      };
      const constraints = {
        email: {
          isRequired: true,
        },
        name: {
          alwaysInvalid: true,
          isRequired: true,
        },
      };
      const expected = {
        name: {
          alwaysInvalid: "This is always invalid.",
        },
      };

      // acts
      const result = ValidationUtil.validateAttributes(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate invalid attributes, #4", () => {
      // arranges
      const attributes = {};
      const constraints = {
        email: {
          isRequired: true,
        },
        name: {
          fname: {
            isRequired: true,
          },
          lname: {
            isRequired: true,
          },
        },
      };
      const expected = {
        email: {
          isRequired: "The email is required.",
        },
        name: {
          fname: {
            isRequired: "The fname is required.",
          },
          lname: {
            isRequired: "The lname is required.",
          },
        },
      };

      // acts
      const result = ValidationUtil.validateAttributes(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });

  describe("#ValidationUtil.validate()", () => {
    it("expect to validate valid attributes, #1", () => {
      // arranges
      const attributes = {
        email: "one@email.com",
        name: "test",
      };
      const constraints = {
        email: {
          isRequired: true,
        },
      };
      const expected = { isValid: true };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate valid attributes, #2", () => {
      // arranges
      const attributes = {
        email: "one@email.com",
        name: {
          fname: "first name",
          lname: "last name",
        },
      };
      const constraints = {
        email: {
          isRequired: true,
        },
        name: {
          fname: {
            isRequired: true,
          },
          lname: {
            isRequired: true,
          },
        },
      };
      const expected = { isValid: true };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate invalid attributes, #1", () => {
      // arranges
      const attributes = {
        email: "one@email.com",
      };
      const constraints = {
        email: {
          isRequired: true,
        },
        name: {
          fname: {
            isRequired: true,
          },
          lname: {
            isRequired: true,
          },
        },
      };
      const expected = {
        invalidAttributes: {
          name: {
            fname: {
              isRequired: "The fname is required.",
            },
            lname: {
              isRequired: "The lname is required.",
            },
          },
        },
        isValid: false,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate invalid attributes, #2", () => {
      // arranges
      const attributes = {};
      const constraints = {
        email: {
          isRequired: true,
        },
        name: {
          fname: {
            isRequired: true,
          },
          lname: {
            isRequired: true,
          },
        },
      };
      const expected = {
        invalidAttributes: {
          email: {
            isRequired: "The email is required.",
          },
          name: {
            fname: {
              isRequired: "The fname is required.",
            },
            lname: {
              isRequired: "The lname is required.",
            },
          },
        },
        isValid: false,
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to validate invalid attributes with options, #1", () => {
      // arranges
      const attributes = {};
      const constraints = {
        email: {
          isRequired: true,
        },
        name: {
          fname: {
            isRequired: true,
          },
          lname: {
            isRequired: true,
          },
        },
      };
      const invalidAttributes = {
        email: {
          isRequired: "The email is required.",
        },
        name: {
          fname: {
            isRequired: "The fname is required.",
          },
          lname: {
            isRequired: "The lname is required.",
          },
        },
      };
      const options = {
        isErrorThrown: true,
      };

      try {
        // acts
        ValidationUtil.validate(attributes, constraints, validators, options);

      } catch (error) {
        // asserts
        expect(error.name).to.deep.equal("FailedValidateError");
        expect(error.message).to.deep.equal("INVALID CONSTRAINT -- The email is required.,The fname is required.,The lname is required.");
        expect(error.invalidAttributes).to.deep.equal(invalidAttributes);
      }
    });
  });
});
