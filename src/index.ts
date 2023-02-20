import { PackageInfo, PackageInfoBase } from "./types";
import { parseDependencies, readJsonFile } from "./parser";
import { getReleaseDate, getLatestVersion } from "./npm";

const getPackageInfos = (dependencies: PackageInfoBase[]): PackageInfo[] =>
  dependencies.map((dependency) => ({
    ...dependency,
    currentVersionDate: getReleaseDate(
      dependency.name,
      dependency.currentVersion
    ),
    latestVersion: getLatestVersion(dependency.name),
    latestVersionDate: getReleaseDate(dependency.name, "latest"),
  }));

export const myPackage = (pathToPackage: string): PackageInfo[] => {
  const packageJson = readJsonFile(pathToPackage);
  const parsedDependencies = parseDependencies(packageJson);
  const packageInfos = getPackageInfos(parsedDependencies);
  // TODO computeScores
  return packageInfos;
};
