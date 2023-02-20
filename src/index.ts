import * as fs from "fs";
import * as path from "path";

type PackageInfo = {
  name: string;
  isDevDependency: boolean;
  currentVersion: string;
  latestVersion: string;
  latestVersionDate: Date;
  currentVersionDate: Date;
};

const readJsonFile = (pathToPackage: string): any => {
    const fileContent = fs.readFileSync(
      path.join(__dirname, pathToPackage),
      "utf8"
    );
    return JSON.parse(fileContent);
  
}

export const myPackage = (pathToPackage: string): PackageInfo[] => {
  const packageJson = readJsonFile(pathToPackage);
  // extract name and currentVersion
  const json = JSON.parse(packageJson);
  const dependencyAnalalysis = json.dependenies.map((item) => {return {name: item.}})
  
  // iterate and fetch additional info
  return [];
};
