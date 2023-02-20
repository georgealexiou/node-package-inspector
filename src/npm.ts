import { execSync } from "child_process";

export const getReleaseDate = (packageName: string, version: string): Date => {
  const dateString = execSync(
    `npm view ${packageName}@${version} time.modified --json --no-update-notifier`,
    { encoding: "utf-8" }
  );
  const sanitizedDateString = dateString.replace(/^"(.+)"\n$/, "$1");
  return new Date(sanitizedDateString);
};

export const getLatestVersion = (packageName: string): string => {
  const version = execSync(
    `npm view ${packageName}@latest version --json --no-update-notifier`,
    {
      encoding: "utf-8",
    }
  );
  return version;
};
