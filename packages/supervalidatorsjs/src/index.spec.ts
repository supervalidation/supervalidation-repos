import { expect } from "chai";
import * as SuperValidatorsJS from "./index";

describe("index.ts tests", () => {
  describe("#SuperValidatorsJS", () => {
    it("expect SuperValidatorsJS to be an object", async () => {
      // arranges

      // acts

      // asserts
      expect(SuperValidatorsJS).to.be.an("object");
    });

    it("expect SuperValidatorsJS to contain all defined keys", async () => {
      // arranges
      const properties = [
        "adapters",
        "inEmailFormat",
        "inEmailFormatRules",
        "inStringLength",
        "inStringLengthRules",
        "isRequired",
        "isRequiredRules",
        "typeOf",
        "typeOfRules",
        "Validators",
        "default",
      ];

      // acts

      // asserts
      Object.keys(SuperValidatorsJS).forEach((key) => {
        expect(properties.indexOf(key) > -1).to.equal(true);
      });
    });
  });

  describe("#SuperValidatorsJS.Validators", () => {
    it("expect SuperValidatorsJS.Validators to contain all defined keys", async () => {
      // arranges
      const properties = [
        "inEmailFormat",
        "inStringLength",
        "isRequired",
        "typeOf",
      ];

      // acts

      // asserts
      Object.keys(SuperValidatorsJS.Validators).forEach((key) => {
        expect(properties.indexOf(key) > -1).to.equal(true);
      });
    });
  });
});
