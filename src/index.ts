import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import {
  DependencyObjectType,
  PackageInfo,
  PackageInfoBase,
  packageJsonSchema,
  PackageJsonType,
} from "./types";
import semver from "semver";

const readJsonFile = (pathToPackage: string): PackageJsonType => {
  const fileContent = fs.readFileSync(
    path.join(__dirname, pathToPackage),
    "utf8"
  );
  return packageJsonSchema.parse(JSON.parse(fileContent));
};

const getReleaseDate = ({
  packageName,
  version,
}: {
  packageName: string;
  version: string;
}): Date => {
  const dateString = execSync(
    `npm view ${packageName}@${version} time.modified --json`,
    {
      encoding: "utf-8",
    }
  );
  return new Date(dateString.replace(/^"(.+)"\n$/, "$1"));
};

const normalizeVersion = (version: string): string =>
  semver.coerce(version)?.version ?? "";

const parseDependencies = (packageJson: PackageJsonType): PackageInfoBase[] => {
  const packages: PackageInfoBase[] = [];
  const parseDependencyArray = ({
    dependencies,
    isDevDependency,
  }: {
    dependencies: DependencyObjectType;
    isDevDependency: boolean;
  }): PackageInfoBase[] =>
    Object.entries(dependencies).map(([name, version]) => ({
      name,
      isDevDependency,
      currentVersion: normalizeVersion(version),
    }));

  return packages.concat(
    parseDependencyArray({
      dependencies: packageJson.dependencies ?? {},
      isDevDependency: false,
    }),
    parseDependencyArray({
      dependencies: packageJson.devDependencies ?? {},
      isDevDependency: false,
    })
  );
};

const getPackageInfos = (dependencies: PackageInfoBase[]): PackageInfo[] =>
  dependencies.map((dependency) => ({
    ...dependency,
    currentVersionDate: getReleaseDate({
      packageName: dependency.name,
      version: dependency.currentVersion,
    }),
  }));

export const myPackage = (pathToPackage: string): PackageInfo[] => {
  const packageJson = readJsonFile(pathToPackage);
  const parsedDependencies = parseDependencies(packageJson);
  const packageInfos = getPackageInfos(parsedDependencies);
  // TODO computeScores
  return packageInfos;
};
