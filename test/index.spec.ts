import { myPackage } from "../src";

// This is from the src/index.ts file
const PATH_TO_MOCK_PACKAGE = "../test/mock-package.json";

describe("index", () => {
  describe("myPackage", () => {
    it("should return an array with name, version and isDevDependency", () => {
      const result = myPackage(PATH_TO_MOCK_PACKAGE);

      expect(result).toMatchObject([
        { name: "react", isDevDependency: false, currentVersion: "^17.0.1" },
        { name: "moment", isDevDependency: false, currentVersion: "^2.20.1" },
        { name: "typescript", isDevDependency: true, currentVersion: "^4.2.4" },
        { name: "eslint", isDevDependency: true, currentVersion: "^7.25.0" },
        { name: "jest", isDevDependency: true, currentVersion: "^27.2.0" },
      ]);
    });
  });
});
