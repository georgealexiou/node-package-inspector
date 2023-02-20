import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
const semver = require("semver");

type PackageInfo = {
  name: string;
  isDevDependency: boolean;
  currentVersion: string;
  currentVersionDate: Date;
  // latestVersion?: string;
  // latestVersionDate?: Date;
};

const readJsonFile = (pathToPackage: string): any => {
  const fileContent = fs.readFileSync(
    path.join(__dirname, pathToPackage),
    "utf8"
  );
  return JSON.parse(fileContent);
};

const getReleaseDate = ({
  packageName,
  version,
}: {
  packageName: string;
  version: string;
}) => {
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

const parseDependencies = (packageJson: any): PackageInfo[] => {
  const packages: PackageInfo[] = [];
  const parseDependencyArray = ({
    dependencies,
    isDevDependency,
  }: {
    dependencies: [];
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
      dependencies: packageJson.dependencies,
      isDevDependency: false,
    }),
    parseDependencyArray({
      dependencies: packageJson.devDependencies,
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
