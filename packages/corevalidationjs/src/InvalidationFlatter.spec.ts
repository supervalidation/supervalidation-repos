import { expect } from "chai";
import { InvalidationsFlatter } from "./InvalidationFlatter";

describe("InvalidationsFlatter.ts tests", () => {
  describe("#InvalidationsFlatter()", () => {
    it("expect to get an array as result", async () => {
      // arranges
      const invalidAttributes = {};

      // acts
      const result = InvalidationsFlatter(invalidAttributes);

      // asserts
      expect(Array.isArray(result)).to.equal(true);
    });

    it("expect to get an array of invalid messages", async () => {
      // arranges
      const invalidAttributes = {
        propA: "invalid propA",
        propB: {
          propB1: "invalid propB1",
          propB2: "invalid propB2",
        },
      };
      const expected = [
        "invalid propA",
        "invalid propB1",
        "invalid propB2",
      ];

      // acts
      const result = InvalidationsFlatter(invalidAttributes);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to get an array of invalid messages", async () => {
      // arranges
      const invalidAttributes = {
        propA: "invalid props",
        propB: {
          propB1: "invalid props",
          propB2: "invalid props",
        },
        propC: "other invalid",
      };
      const expected = ["invalid props", "other invalid"];

      // acts
      const result = InvalidationsFlatter(invalidAttributes);

      // asserts
      expect(result).to.deep.equal(expected);
    });

    it("expect to get an array of invalid messages with initial messages", async () => {
      // arranges
      const invalidAttributes = {
        propA: "invalid propA",
        propB: {
          propB1: "invalid propB1",
          propB2: "invalid propB2",
        },
      };
      const initialMessages = ["initial invalid message"];
      const expected = [
        "initial invalid message",
        "invalid propA",
        "invalid propB1",
        "invalid propB2",
      ];

      // acts
      const result = InvalidationsFlatter(invalidAttributes, initialMessages);

      // asserts
      expect(result).to.deep.equal(expected);
    });
  });
});
