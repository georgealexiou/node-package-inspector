import { PackageInfo, PackageInfoBase, PackageInfoWithScore } from "./types";
import { parseDependencies, readJsonFile } from "./parser";
import { getReleaseDate, getLatestVersion } from "./npm";
import { scoreMapper } from "./score";

const getPackageInfos = (
  dependencies: PackageInfoBase[],
  withLogs = false
): PackageInfo[] =>
  dependencies.map((dependency) => {
    const newDependency = {
      ...dependency,
      currentVersionDate: getReleaseDate(
        dependency.name,
        dependency.currentVersion
      ),
      latestVersion: getLatestVersion(dependency.name),
      latestVersionDate: getReleaseDate(dependency.name, "latest"),
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
