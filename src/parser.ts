import semver from "semver";
import {
  PackageJsonType,
  PackageInfoBase,
  DependencyObjectType,
  packageJsonSchema,
} from "./types";
import * as fs from "fs";
import * as path from "path";

const normalizeVersion = (version: string): string =>
  semver.coerce(version)?.version ?? "";

export const readJsonFile = (pathToPackage: string): PackageJsonType => {
  const fileContent = fs.readFileSync(
    path.join(__dirname, pathToPackage),
    "utf8"
  );
  return packageJsonSchema.parse(JSON.parse(fileContent));
};

export const parseDependencies = (
  packageJson: PackageJsonType
): PackageInfoBase[] => {
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
