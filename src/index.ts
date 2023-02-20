import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import {
  DependencyObjectType,
  PackageInfo,
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

const parseDependencies = (packageJson: PackageJsonType): PackageInfo[] => {
  const packages: PackageInfo[] = [];
  const parseDependencyArray = ({
    dependencies,
    isDevDependency,
  }: {
    dependencies: DependencyObjectType;
    isDevDependency: boolean;
  }) =>
    Object.entries(dependencies).map(([name, version]) => ({
      name,
      isDevDependency,
      currentVersion: normalizeVersion(version),
      currentVersionDate: getReleaseDate({
        packageName: name,
        version: normalizeVersion(version),
      }),
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

export const myPackage = (pathToPackage: string): PackageInfo[] => {
  const packageJson = readJsonFile(pathToPackage);
  // extract name and currentVersion
  const parsedDependencies = parseDependencies(packageJson);
  // iterate and fetch additional info
  return parsedDependencies;
};
