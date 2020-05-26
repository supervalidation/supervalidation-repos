import { expect } from "chai";
import { adapters } from "./index";

describe("adapters/index.ts tests", () => {
  describe("#adapters", () => {
    it("expect adapters as an object", async () => {
      // arranges

      // acts

      // asserts
      expect(adapters).not.to.equal(null);
      expect(adapters).not.to.equal(undefined);
      expect(adapters).to.be.an("object");
    });
  });

  describe("#adapters.validatorAdapter", () => {
    it("expect adapters.validatorAdapter as a function", async () => {
      // arranges

      // acts

      // asserts
      expect(adapters.validatorAdapter).not.to.equal(null);
      expect(adapters.validatorAdapter).not.to.equal(undefined);
      expect(adapters.validatorAdapter).to.be.a("function");
    });
  });
});
