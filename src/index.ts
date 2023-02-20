import * as fs from "fs";
import * as path from "path";
import { PackageInfoBase, packageJsonSchema, PackageJsonType } from "./types";

const readJsonFile = (pathToPackage: string): PackageJsonType => {
  const fileContent = fs.readFileSync(
    path.join(__dirname, pathToPackage),
    "utf8"
  );
  return packageJsonSchema.parse(JSON.parse(fileContent));
};

const parseDependencies = (packageJson: PackageJsonType): PackageInfoBase[] => {
  const packages = [];

  packages.push(
    ...Object.entries(packageJson?.dependencies ?? {}).map(
      ([name, version]) => ({
        name,
        isDevDependency: false,
        currentVersion: version,
      })
    )
  );

  packages.push(
    ...Object.entries(packageJson?.devDependencies ?? {}).map(
      ([name, version]) => ({
        name,
        isDevDependency: true,
        currentVersion: version,
      })
    )
  );

  return packages;
};

export const myPackage = (pathToPackage: string): PackageInfoBase[] => {
  const packageJson = readJsonFile(pathToPackage);
  const parsedDependencies = parseDependencies(packageJson);
  // iterate and fetch additional info
  return parsedDependencies;
};
