import { expect } from "chai";
import { Validator } from "./index";

describe("ValidatorUtil/index.ts tests", () => {
  describe("#ValidatorUtil", () => {
    it("expect to merge all validators", async () => {
      // arranges
      const properties = [
        "merge",
      ];

      // acts

      // asserts
      Object.keys(Validator).forEach((key) => {
        expect(properties.indexOf(key) > -1).to.equal(true);
      });
    });
  });
});
