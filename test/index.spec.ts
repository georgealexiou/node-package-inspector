import { myPackage } from "../src";

// This is from the src/index.ts file
const PATH_TO_MOCK_PACKAGE = "../test/mock-package.json";

describe("index", () => {
  describe("myPackage", () => {
    it("should return an array with name and version", () => {
      const result = myPackage(PATH_TO_MOCK_PACKAGE);

      expect(result).toMatchObject([
        {
          name: "react",
          version: "^17.0.1",
        },
        {
          name: "moment",
          version: "^2.20.1",
        },
        {
          name: "typescript",
          version: "^4.2.4",
        },
        {
          name: "eslint",
          version: "^7.25.0",
        },
        {
          name: "jest",
          version: "^27.2.0",
        },
      ]);
    });
  });
});
