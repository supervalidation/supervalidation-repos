import { expect } from "chai";
import { IValidator } from "corevalidationjs";
import { rulesOf } from "./rulesOf";

describe("Validator/rulesOf.ts tests", () => {
  describe("#Validator.rule()", () => {
    it("expect to create a custom validator with properties", async () => {
      // arranges
      const validator: IValidator<string> = {
        message: () => "",
        validate: () => true,
      };

      // acts
      const result = rulesOf(validator);

      // asserts
      expect(typeof result).to.equal("function");
    });

    it("expect to create an options of validator rules from rulesOf()", async () => {
      // arranges
      const validator: IValidator<string> = {
        message: () => "",
        validate: () => true,
      };

      const expected = {
        rules: "test",
      };

      // acts
      const result = rulesOf(validator)({
        rules: "test",
      });

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
