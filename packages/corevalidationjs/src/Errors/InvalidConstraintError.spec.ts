import { expect } from "chai";
import { InvalidConstraintError } from "./InvalidConstraintError";

describe("InvalidConstraintError.ts", () => {
  describe("#InvalidConstraintError()", () => {
    it("expect to create an instance of InvalidConstraintError", () => {
      // arranges

      // acts
      const error = new InvalidConstraintError();

      // asserts
      expect(error.name).to.equal("InvalidConstraintError");
      expect(error.message).to.equal("INVALID CONSTRAINT");
    });
  });
});
