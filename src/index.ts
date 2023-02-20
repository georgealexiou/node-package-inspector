import * as fs from "fs";
import * as path from "path";

type PackageInfo = {
  name: string;
  isDevDependency: boolean;
  currentVersion: string;
  // latestVersion?: string;
  // latestVersionDate?: Date;
  // currentVersionDate?: Date;
};

const readJsonFile = (pathToPackage: string): any => {
  const fileContent = fs.readFileSync(
    path.join(__dirname, pathToPackage),
    "utf8"
  );
  return JSON.parse(fileContent);
};

const parseDependencies = (packageJson: any): PackageInfo[] => {
  const packages = [];

  packages.push(
    ...Object.entries(packageJson.dependencies).map(([name, version]) => ({
      name,
      isDevDependency: false,
      currentVersion: version,
    }))
  );

  packages.push(
    ...Object.entries(packageJson.devDependencies).map(([name, version]) => ({
      name,
      isDevDependency: true,
      currentVersion: version,
    }))
  );

  return packages;
};

export const myPackage = (pathToPackage: string): PackageInfo[] => {
  const packageJson = readJsonFile(pathToPackage);
  // extract name and currentVersion
  console.log(packageJson);
  const parsedDependencies = parseDependencies(packageJson);
  console.log(parsedDependencies);
  // iterate and fetch additional info
  return parsedDependencies;
};
