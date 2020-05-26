import { expect } from "chai";

// tslint:disable-next-line: no-var-requires
const Validators = require("./validators");

describe("validators.ts tests", () => {
  describe("#validators", () => {
    it("expect validators to be an object", async () => {
      // arranges

      // acts

      // asserts
      expect(Validators).to.be.an("object");
    });

    it("expect validators to contain all defined keys", async () => {
      // arranges
      const properties = [
        "inEmailFormat",
        "isRequired",
        "typeOf",
      ];

      // acts

      // asserts
      expect(Validators).to.contain.all.keys(properties);
    });
  });
});
