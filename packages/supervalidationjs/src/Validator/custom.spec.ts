import { expect } from "chai";
import { custom } from "./custom";

describe("Validator/custom.ts tests", () => {
  describe("#Validator.custom()", () => {
    it("expect to create a custom validator with properties", async () => {
      // arranges
      const message = () => "result";
      const validate = () => true;

      // acts
      const validator = custom({
        message,
        validate,
      });

      // asserts
      expect(validator.message).to.equal(message);
      expect(validator.validate).to.equal(validate);
    });

    it("expect to create a custom validator with default message()", async () => {
      // arranges
      const validate = () => true;
      const validator = custom({
        validate,
      });

      // acts
      const result = validator.message("test", undefined, false);

      // asserts
      expect(result).to.equal("[test] is invalid.");
    });
  });
});
