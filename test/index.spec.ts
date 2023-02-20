import { myPackage } from "../src";

// This is from the src/index.ts file
const PATH_TO_MOCK_PACKAGE = "../test/mock-package.json";

describe("index", () => {
  describe("myPackage", () => {
    it("should return an array with name, version and isDevDependency", () => {
      const result = myPackage(PATH_TO_MOCK_PACKAGE);

      expect(result).toMatchObject([
        {
          name: "react",
          isDevDependency: false,
          currentVersion: "17.0.1",
          currentVersionDate: new Date("2023-02-20T19:35:26.034Z"),
        },
        {
          name: "moment",
          isDevDependency: false,
          currentVersion: "2.20.1",
          currentVersionDate: new Date("2022-11-18T07:54:02.548Z"),
        },
        {
          name: "typescript",
          isDevDependency: false,
          currentVersion: "4.2.4",
          currentVersionDate: new Date("2023-02-20T07:11:28.226Z"),
        },
        {
          name: "eslint",
          isDevDependency: false,
          currentVersion: "7.25.0",
          currentVersionDate: new Date("2023-02-11T20:31:23.629Z"),
        },
        {
          name: "jest",
          isDevDependency: false,
          currentVersion: "27.2.0",
          currentVersionDate: new Date("2023-02-15T11:57:49.016Z"),
        },
      ]);
    });
  });
});
