import { expect } from "chai";
import { FailedValidateError } from "./FailedValidateError";

describe("FailedValidateError.ts", () => {
  describe("#FailedValidateError()", () => {
    it("expect to create an instance of FailedValidateError", () => {
      // arranges
      const invalidAttributes = {
        email: {
          isRequired: "The email is required.",
        },
        name: {
          fname: {
            isRequired: "The fname is required.",
          },
          lname: {
            isRequired: "The lname is required.",
          },
        },
      };
      const description = "The email is required. | The fname is required. | The lname is required.";

      // acts
      const error = new FailedValidateError(invalidAttributes);

      // asserts
      expect(error.name).to.equal("FailedValidateError");
      expect(error.message).to.equal("INVALID CONSTRAINT -- The email is required. | The fname is required. | The lname is required.");
      expect(error.description).to.equal(description);
      expect(error.invalidAttributes).to.deep.equal(invalidAttributes);
    });
  });
});
