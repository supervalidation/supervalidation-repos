import { expect } from "chai";
import { IValidator } from "corevalidationjs";
import { ruleOf } from "./ruleOf";

describe("Validator/rule.ts tests", () => {
  describe("#Validator.rule()", () => {
    it("expect to create a custom validator with properties", async () => {
      // arranges
      const validator: IValidator<{ rule: string;}> = {
        message: () => "",
        validate: () => true,
      };

      // acts
      const result = ruleOf(validator);

      // asserts
      expect(typeof result).to.equal("function");
    });

    it("expect to create a rule from ruleOf()", async () => {
      // arranges
      const validator: IValidator<{ rule: string;}> = {
        message: () => "",
        validate: () => true,
      };

      const rule = {
        rule: "test",
      };

      // acts
      const result = ruleOf(validator)(rule);

      // asserts
      expect(result).to.equal(rule);
    });
  });
});
