import { execSync } from "child_process";
import { PackageInfo, PackageInfoBase } from "./types";
import { parseDependencies, readJsonFile } from "./parser";

const getReleaseDate = (packageName: string, version: string): Date => {
  const dateString = execSync(
    `npm view ${packageName}@${version} time.modified --json`,
    { encoding: "utf-8" }
  );
  const sanitizedDateString = dateString.replace(/^"(.+)"\n$/, "$1");
  return new Date(sanitizedDateString);
};

const getPackageInfos = (dependencies: PackageInfoBase[]): PackageInfo[] =>
  dependencies.map((dependency) => ({
    ...dependency,
    currentVersionDate: getReleaseDate(
      dependency.name,
      dependency.currentVersion
    ),
    latestVersion: "",
    latestVersionDate: new Date(),
  }));

export const myPackage = (pathToPackage: string): PackageInfo[] => {
  const packageJson = readJsonFile(pathToPackage);
  const parsedDependencies = parseDependencies(packageJson);
  const packageInfos = getPackageInfos(parsedDependencies);
  // TODO computeScores
  return packageInfos;
};
