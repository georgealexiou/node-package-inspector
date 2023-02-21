import { PackageInfo, PackageInfoWithScore } from "./types";

export const scoreMapper = (packageInfo: PackageInfo): PackageInfoWithScore => {
  return { ...packageInfo, score: computeScore(packageInfo) };
};

const ONE_YEAR_AGO = new Date();
ONE_YEAR_AGO.setFullYear(ONE_YEAR_AGO.getFullYear() - 1);

export const computeScore = ({
  currentVersion,
  currentVersionDate,
  latestVersion,
  latestVersionDate,
}: PackageInfo): number => {
  if (currentVersion === latestVersion) {
    return 100;
  }
  const ONE_YEAR_BEFORE_LATEST = new Date(latestVersionDate);
  ONE_YEAR_BEFORE_LATEST.setFullYear(ONE_YEAR_BEFORE_LATEST.getFullYear() - 1);

  if (currentVersionDate > ONE_YEAR_BEFORE_LATEST) {
    return 50;
  }

  return 0;
};
