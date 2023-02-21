import { PackageInfo } from "./../src/types";
import { scoreMapper } from "../src/score";

const basePackageInfo: PackageInfo = {
  name: "react",
  isDevDependency: false,
  currentVersion: "17.0.1",
  currentVersionDate: new Date("2022-01-01"),
  latestVersion: "18.0.2",
  latestVersionDate: new Date("2023-02-11"),
};

describe("Score", () => {
  it("should return 100 if currentVersion == latestVersion", () => {
    const packageInfo = {
      ...basePackageInfo,
      currentVersion: basePackageInfo.latestVersion,
      currentVersionDate: basePackageInfo.latestVersionDate,
    };
    const result = scoreMapper(packageInfo);
    expect(result.score).toBe(100);
  });

  it("should return 50 if currentVersion has been updated in less than a year", () => {
    const packageInfo = {
      ...basePackageInfo,
      currentVersionDate: new Date("2022-08-01"),
      latestVersionDate: new Date("2023-01-01"),
    };
    const result = scoreMapper(packageInfo);
    expect(result.score).toBe(50);
  });

  it("should return 0 if currentVersion has not been updated in more than a year", () => {
    const packageInfo = {
      ...basePackageInfo,
      currentVersionDate: new Date("2021-01-01"),
      latestVersionDate: new Date("2023-01-01"),
    };
    const result = scoreMapper(packageInfo);
    expect(result.score).toBe(0);
  });
});
