import { expect } from "chai";
import { isNullOrUndefined } from "util";
import { IConstraint } from "./IConstraints";
import { IValidator } from "./IValidator";
import { ValidationUtil, IValidateOptions } from "./ValidationUtil";

const validators: { [validator: string]: IValidator } = {
  alwaysInvalid: {
    message: () => "This is always invalid.",
    validate: () => false,
  },
  alwaysValid: {
    message: () => "This is always valid.",
    validate: () => true,
  },
  isRequired: {
    message: (name) => `The ${name} is required.`,
    validate: (value) => !isNullOrUndefined(value),
  },
};

describe("ValidationUtil.ts", () => {
  describe("#ValidationUtil.describe()", () => {
    it("expect to describe constraints, #1", () => {
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
      const expected: any[] = [
        {
          attribute: {
            key: "email",
            value: "one@email.com",
          },
          validator: "isRequired",
          rules: true,
        }, {
          attribute: {
            key: "fname",
            value: "first name",
          },
          validator: "isRequired",
          rules: true,
        }, {
          attribute: {
            key: "lname",
            value: "last name",
          },
          validator: "isRequired",
          rules: true,
        },
      ];

      // acts
      const result = ValidationUtil.describe(attributes, constraints);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to describe constraints, #2", () => {
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
          alwaysValid: {
            rules: {
              key: "value",
            },
          },
        },
        name: {
          fname: {
            isRequired: true,
          },
          lname: {
            isRequired: true,
            alwaysValid: true,
          },
        },
      };
      const expected: any[] = [
        {
          attribute: {
            key: "email",
            value: "one@email.com",
          },
          validator: "isRequired",
          rules: true,
        }, {
          attribute: {
            key: "email",
            value: "one@email.com",
          },
          validator: "alwaysValid",
          rules: {
            key: "value",
          },
        }, {
          attribute: {
            key: "fname",
            value: "first name",
          },
          validator: "isRequired",
          rules: true,
        }, {
          attribute: {
            key: "lname",
            value: "last name",
          },
          validator: "isRequired",
          rules: true,
        }, {
          attribute: {
            key: "lname",
            value: "last name",
          },
          validator: "alwaysValid",
          rules: true,
        },
      ];

      // acts
      const result = ValidationUtil.describe(attributes, constraints);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to describe constraints with invalid attributes", () => {
      // arranges
      const attributes = {
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
      const expected: any[] = [
        {
          attribute: {
            key: "email",
            value: undefined,
          },
          validator: "isRequired",
          rules: true,
        }, {
          attribute: {
            key: "fname",
            value: undefined,
          },
          validator: "isRequired",
          rules: true,
        }, {
          attribute: {
            key: "lname",
            value: undefined,
          },
          validator: "isRequired",
          rules: true,
        },
      ];

      // acts
      const result = ValidationUtil.describe(attributes, constraints);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });

  describe("#ValidationUtil.validateValue()", () => {
    it("expect to validate valid attributes", () => {
      // arranges
      const name = "email";
      const value = "one@email.com";
      const constraint: IConstraint = {
        isRequired: true,
      };

      // acts
      const act = () => ValidationUtil.validateValue(name, value, constraint, {}, []);

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
      const result = ValidationUtil.validateValue(name, value, constraint, validators, []);

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
      const result = ValidationUtil.validateValue(name, value, constraint, validators, []);

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
      const result = ValidationUtil.validateValue(name, value, constraint, validators, []);

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
      const result = ValidationUtil.validateValue(name, value, constraint, arragedValidators, []);

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
      const result = ValidationUtil.validateValue(name, value, constraint, validators, []);

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
      const result = ValidationUtil.validateValue(name, value, constraint, validators, []);

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
      const result = ValidationUtil.validateAttributes(attributes, constraints, validators, []);

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
      const result = ValidationUtil.validateAttributes(attributes, constraints, validators, []);

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
      const result = ValidationUtil.validateAttributes(attributes, constraints, validators, []);

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
      const result = ValidationUtil.validateAttributes(attributes, constraints, validators, []);

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
      const result = ValidationUtil.validateAttributes(attributes, constraints, validators, []);

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
      const result = ValidationUtil.validateAttributes(attributes, constraints, validators, []);

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

    it("expect to validate invalid attributes with format options, #1", () => {
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
      const invalidAttributes = ["The email is required.", "The fname is required.", "The lname is required."];
      const options: IValidateOptions = {
        format: "flat",
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators, options);


      // asserts
      expect(result.isValid).to.equal(false);
      expect(result.invalidAttributes).to.deep.equal(invalidAttributes);
    });

    it("expect to validate invalid attributes with format options, #2", () => {
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
      const options: IValidateOptions = {
        format: "detail",
      };

      // acts
      const result = ValidationUtil.validate(attributes, constraints, validators, options);


      // asserts
      expect(result.isValid).to.equal(false);
      expect(result.invalidAttributes).to.deep.equal(invalidAttributes);
    });
  });
});
