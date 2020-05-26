import { expect } from "chai";
import { merge } from "./merge";

describe("Validators/merge.ts tests", () => {
  describe("#Validators.merge()", () => {
    it("expect to merge all validators", async () => {
      // arranges
      const validators: any = {
        v1: {},
        v2: {},
      };
      const v3: any = {};
      const v4: any = {};

      const expected = {
        ...validators,
        v3,
        v4,
      };

      // acts
      const result = merge(validators, { v3, v4 });

      // asserts
      expect(result).to.deep.equal(expected);
      expect(result).to.not.equal(validators);
    });
  });
});
