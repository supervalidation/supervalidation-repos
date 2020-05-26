import { expect } from "chai";
import { ConstraintsUtil } from "./ConstraintsUtil";

describe("ConstraintsUtil.ts", () => {
  describe("#isNestedAttributes() | isRulesValues() | isValidatorOptions()", () => {
    it("expect to determine values are undefined", () => {
      // arranges
      const values = undefined;

      // acts
      const isNestedAttributes = ConstraintsUtil.isNestedAttributes(values);
      const isRulesValues = ConstraintsUtil.isRulesValues(values);
      const isValidatorOptions = ConstraintsUtil.isValidatorOptions(values);

      // asserts
      expect(isNestedAttributes).to.equal(false);
      expect(isRulesValues).to.equal(true);
      expect(isValidatorOptions).to.equal(false);
    });

    it("expect to determine values are null", () => {
      // arranges
      const values = null;

      // acts
      const isNestedAttributes = ConstraintsUtil.isNestedAttributes(values);
      const isRulesValues = ConstraintsUtil.isRulesValues(values);
      const isValidatorOptions = ConstraintsUtil.isValidatorOptions(values);

      // asserts
      expect(isNestedAttributes).to.equal(false);
      expect(isRulesValues).to.equal(true);
      expect(isValidatorOptions).to.equal(false);
    });

    it("expect to determine values are string", () => {
      // arranges
      const values = "string";

      // acts
      const isNestedAttributes = ConstraintsUtil.isNestedAttributes(values);
      const isRulesValues = ConstraintsUtil.isRulesValues(values);
      const isValidatorOptions = ConstraintsUtil.isValidatorOptions(values);

      // asserts
      expect(isNestedAttributes).to.equal(false);
      expect(isRulesValues).to.equal(true);
      expect(isValidatorOptions).to.equal(false);
    });

    it("expect to determine values are number", () => {
      // arranges
      const values = 0;

      // acts
      const isNestedAttributes = ConstraintsUtil.isNestedAttributes(values);
      const isRulesValues = ConstraintsUtil.isRulesValues(values);
      const isValidatorOptions = ConstraintsUtil.isValidatorOptions(values);

      // asserts
      expect(isNestedAttributes).to.equal(false);
      expect(isRulesValues).to.equal(true);
      expect(isValidatorOptions).to.equal(false);
    });

    it("expect to determine values are boolean", () => {
      // arranges
      const values = true;

      // acts
      const isNestedAttributes = ConstraintsUtil.isNestedAttributes(values);
      const isRulesValues = ConstraintsUtil.isRulesValues(values);
      const isValidatorOptions = ConstraintsUtil.isValidatorOptions(values);

      // asserts
      expect(isNestedAttributes).to.equal(false);
      expect(isRulesValues).to.equal(true);
      expect(isValidatorOptions).to.equal(false);
    });

    it("expect to determine values are an array of string", () => {
      // arranges
      const values = ["0", "1"];

      // acts
      const isNestedAttributes = ConstraintsUtil.isNestedAttributes(values);
      const isRulesValues = ConstraintsUtil.isRulesValues(values);
      const isValidatorOptions = ConstraintsUtil.isValidatorOptions(values);

      // asserts
      expect(isNestedAttributes).to.equal(false);
      expect(isRulesValues).to.equal(true);
      expect(isValidatorOptions).to.equal(false);
    });

    it("expect to determine values are an array of number", () => {
      // arranges
      const values = [0, 1];

      // acts
      const isNestedAttributes = ConstraintsUtil.isNestedAttributes(values);
      const isRulesValues = ConstraintsUtil.isRulesValues(values);
      const isValidatorOptions = ConstraintsUtil.isValidatorOptions(values);

      // asserts
      expect(isNestedAttributes).to.equal(false);
      expect(isRulesValues).to.equal(true);
      expect(isValidatorOptions).to.equal(false);
    });

    it("expect to determine values are an array of boolean", () => {
      // arranges
      const values = [true, false];

      // acts
      const isNestedAttributes = ConstraintsUtil.isNestedAttributes(values);
      const isRulesValues = ConstraintsUtil.isRulesValues(values);
      const isValidatorOptions = ConstraintsUtil.isValidatorOptions(values);

      // asserts
      expect(isNestedAttributes).to.equal(false);
      expect(isRulesValues).to.equal(true);
      expect(isValidatorOptions).to.equal(false);
    });

    it("expect to determine values are validator options", () => {
      // arranges
      const values = { rules: "" };

      // acts
      const isNestedAttributes = ConstraintsUtil.isNestedAttributes(values);
      const isRulesValues = ConstraintsUtil.isRulesValues(values);
      const isValidatorOptions = ConstraintsUtil.isValidatorOptions(values);

      // asserts
      expect(isNestedAttributes).to.equal(false);
      expect(isRulesValues).to.equal(false);
      expect(isValidatorOptions).to.equal(true);
    });

    it("expect to determine values are nested objects", () => {
      // arranges
      const values = {
        nested: {
          key: "value",
        },
      };

      // acts
      const isNestedAttributes = ConstraintsUtil.isNestedAttributes(values);
      const isRulesValues = ConstraintsUtil.isRulesValues(values);
      const isValidatorOptions = ConstraintsUtil.isValidatorOptions(values);

      // asserts
      expect(isNestedAttributes).to.equal(true);
      expect(isRulesValues).to.equal(false);
      expect(isValidatorOptions).to.equal(false);
    });
  });

  describe("#isConstraint()", () => {
    it("expect to get a type of Constraints, #1", () => {
      // arranges
      const obj = {
        isRequired: true,
      };

      // acts
      const result = ConstraintsUtil.isConstraint(obj);

      // asserts
      expect(result).to.equal(true);
    });

    it("expect to get a type of Constraints, #2", () => {
      // arranges
      const obj = {};

      // acts
      const result = ConstraintsUtil.isConstraint(obj);

      // asserts
      expect(result).to.equal(true);
    });

    it("expect to get a type of Constraints, #3", () => {
      // arranges
      const obj = {
        email: {
          isRequired: true,
        },
      };

      // acts
      const result = ConstraintsUtil.isConstraint(obj);

      // asserts
      expect(result).to.equal(false);
    });

    it("expect to get a type of Constraints, #4", () => {
      // arranges
      const obj = {
        email: {
          isRequired: true,
        },
        tags: {
          isRequired: false,
        },
      };

      // acts
      const result = ConstraintsUtil.isConstraint(obj);

      // asserts
      expect(result).to.equal(false);
    });

    it("expect to get a type of Constraints, #5", () => {
      // arranges
      const obj = {
        isRequired: {
          rules: true,
        },
        type: {
          rules: "string",
        },
      };

      // acts
      const result = ConstraintsUtil.isConstraint(obj);

      // asserts
      expect(result).to.equal(true);
    });

    it("expect to throw an Error when the constraint is invalid", () => {
      // arranges
      const obj = {
        isRequired: {
          rules: true,
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
      const act = () => ConstraintsUtil.isConstraint(obj);

      // asserts
      expect(act).to.throw(Error);
    });
  });
});
