import { PackageInfo, PackageInfoBase, PackageInfoWithScore } from "./types";
import { parseDependencies, readJsonFile } from "./parser";
import { getLatestVersion, getAllReleaseDates } from "./npm";
import { scoreMapper } from "./score";

const getPackageInfos = (
  dependencies: PackageInfoBase[],
  withLogs = false
): PackageInfo[] =>
  dependencies.map((dependency) => {
    const allReleaseDates = getAllReleaseDates(dependency.name);
    const latestVersion = getLatestVersion(dependency.name);

    const newDependency = {
      ...dependency,
      currentVersionDate: new Date(allReleaseDates[dependency.currentVersion]),
      latestVersion,
      latestVersionDate: new Date(allReleaseDates[latestVersion]),
    };

    if (withLogs) {
      console.log(`🚀 ${dependency.name}`);
    }

    return newDependency;
  });

export const main = (
  pathToPackage: string,
  withLogs = false
): PackageInfoWithScore[] => {
  const packageJson = readJsonFile(pathToPackage);
  const parsedDependencies = parseDependencies(packageJson);
  const packageInfos = getPackageInfos(parsedDependencies, withLogs);
  return packageInfos.map(scoreMapper);
};
