import { execSync } from "child_process";

const sanitizeString = (input: string): string =>
  input.replace(/^"(.+)"\n$/, "$1");

export const getAllReleaseDates = (
  packageName: string
): Record<string, string> => {
  const allDates = execSync(
    `npm view ${packageName} time --json --no-update-notifier`,
    { encoding: "utf-8" }
  );
  return JSON.parse(allDates);
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
