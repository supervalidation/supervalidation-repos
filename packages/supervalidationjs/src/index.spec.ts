import { expect } from "chai";
import { Validation } from "./index";

describe("index.ts tests", () => {
  describe("#Validation", () => {
    it("expect validation not to equal undefined", async () => {
      // arranges

      // acts

      // asserts
      expect(Validation).not.to.equal(undefined);
      expect(Validation).not.to.equal(null);
    });
  });
});
