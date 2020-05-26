import { expect } from "chai";
import * as sinon from "sinon";
import { Validation } from "./Validation";

describe("Validation.ts tests", () => {
  describe("#Validation.getInstance()", () => {
    it("expect to get an instance", async () => {
      // arranges

      // acts
      const instance = Validation.getInstance();

      // asserts
      expect(instance).not.to.equal(undefined);
      expect(instance).not.to.equal(null);
    });

    it("expect to get an instance with defined validators", async () => {
      // arranges
      const test = {};
      const validators: any = {
        test,
      };

      // acts
      const instance = Validation.getInstance(validators);
      const validator = instance.getValidator("test");

      // asserts
      expect(validator).to.equal(test);
    });
  });

  describe("#setValidator() | getValidator()", () => {
    it("expect to set and get a validator", () => {
      // arranges
      const instance = Validation.getInstance();
      const validator: any = {};

      // acts
      instance.setValidator("test", validator);

      // asserts
      expect(instance.getValidator("test")).to.equal(validator);
    });
  });

  describe("#validate()", () => {
    it("expect to validate attributes", () => {
      // arranges
      const validators = {
        isRequired: {
          message: () => "It's required.",
          validate: (value: any) => !(value === undefined || value === null),
        },
      };
      const validation = Validation.getInstance(validators);
      const constraints = {
        email: {
          isRequired: true,
        },
      };
      const validExpected = { isValid: true };
      const invalidExpected = {
        invalidAttributes: {
          email: {
            isRequired: "It's required.",
          },
        },
        isValid: false,
      };

      // acts
      const valid = validation.validate({ email: "one@email.com" }, constraints);
      const invalid = validation.validate({}, constraints);

      // asserts
      expect(valid).to.deep.equal(validExpected);
      expect(invalid).to.deep.equal(invalidExpected);
    });

    it("expect to call a validator.validate() with arguments", () => {
      // arranges
      const validators = {
        either: {
          message: () => "",
          validate: (value: any, rules: any, aggregate: any) => false,
        },
      };
      const spyEither = sinon.spy(validators.either, "validate");
      const instance = Validation.getInstance(validators);
      const attributes = {
        name: {
          en: "English Name",
        },
      };
      const constraints = {
        name: {
          either: {
            rules: ["en", "th"],
          },
        },
      };

      // acts
      instance.validate(attributes, constraints);

      // asserts
      expect(spyEither.calledWith(attributes.name, constraints.name.either.rules, attributes)).to.equal(true);
    });
  });
});
