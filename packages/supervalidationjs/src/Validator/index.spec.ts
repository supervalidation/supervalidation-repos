import { expect } from "chai";
import { Validator } from "./index";

describe("Validator/index.ts tests", () => {
  describe("#Validator", () => {
    it("expect to have all Validator properties", async () => {
      // arranges
      const properties = [
        "custom",
        "merge",
        "rulesOf",
      ];

      // acts

      // asserts
      Object.keys(Validator).forEach((key) => {
        expect(properties.indexOf(key) > -1).to.equal(true);
      });
    });
  });
});
