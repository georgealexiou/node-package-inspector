import { execSync } from "child_process";

const sanitizeString = (input: string): string =>
  input.replace(/^"(.+)"\n$/, "$1");

export const getReleaseDate = (packageName: string, version: string): Date => {
  const dateString = execSync(
    `npm view ${packageName}@${version} time.modified --json --no-update-notifier`,
    { encoding: "utf-8" }
  );
  return new Date(sanitizeString(dateString));
};

export const getLatestVersion = (packageName: string): string => {
  const version = execSync(
    `npm view ${packageName}@latest version --json --no-update-notifier`,
    {
      encoding: "utf-8",
    }
  );
  return sanitizeString(version);
};
