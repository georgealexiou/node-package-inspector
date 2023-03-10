import { main } from "../src";

// This is from the src/index.ts file
const PATH_TO_MOCK_PACKAGE = "../test/mock-package.json";
const PATH_TO_MOCK__INVALID_PACKAGE =
  "../test/mock-package-invalid-dependency.json";

const FAKE_DATE = "2023-02-11T20:31:23.629Z";
const FAKE_LATEST_VERSION = "1.2.3";

jest.mock("../src/npm", () => ({
  getAllReleaseDates: () => ({
    [FAKE_LATEST_VERSION]: FAKE_DATE,
    "17.0.1": FAKE_DATE,
    "2.20.1": FAKE_DATE,
    "4.2.4": FAKE_DATE,
    "7.25.0": FAKE_DATE,
    "27.2.0": FAKE_DATE,
  }),
  getLatestVersion: () => FAKE_LATEST_VERSION,
}));

describe("index", () => {
  it("should return an array with name, version and isDevDependency", () => {
    const result = main(PATH_TO_MOCK_PACKAGE);

    expect(result).toMatchObject([
      {
        name: "react",
        isDevDependency: false,
        currentVersion: "17.0.1",
        currentVersionDate: new Date(FAKE_DATE),
        latestVersion: FAKE_LATEST_VERSION,
        latestVersionDate: new Date(FAKE_DATE),
      },
      {
        name: "moment",
        isDevDependency: false,
        currentVersion: "2.20.1",
        currentVersionDate: new Date(FAKE_DATE),
        latestVersion: FAKE_LATEST_VERSION,
        latestVersionDate: new Date(FAKE_DATE),
      },
      {
        name: "typescript",
        isDevDependency: true,
        currentVersion: "4.2.4",
        currentVersionDate: new Date(FAKE_DATE),
        latestVersion: FAKE_LATEST_VERSION,
        latestVersionDate: new Date(FAKE_DATE),
      },
      {
        name: "eslint",
        isDevDependency: true,
        currentVersion: "7.25.0",
        currentVersionDate: new Date(FAKE_DATE),
        latestVersion: FAKE_LATEST_VERSION,
        latestVersionDate: new Date(FAKE_DATE),
      },
      {
        name: "jest",
        isDevDependency: true,
        currentVersion: "27.2.0",
        currentVersionDate: new Date(FAKE_DATE),
        latestVersion: FAKE_LATEST_VERSION,
        latestVersionDate: new Date(FAKE_DATE),
      },
    ]);
  });

  describe("main validation", () => {
    it("should error when dependency is not valid semver", () => {
      expect(() => main(PATH_TO_MOCK__INVALID_PACKAGE)).toThrow(
        "Invalid semver version"
      );
    });
  });
});
