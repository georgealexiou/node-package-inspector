import { z } from "zod";
import semver from "semver";

export type PackageInfoBase = {
  name: string;
  isDevDependency: boolean;
  currentVersion: string;
};

export type PackageInfo = PackageInfoBase & {
  currentVersionDate: Date;
  latestVersion: string;
  latestVersionDate: Date;
};

export type PackageInfoWithScore = PackageInfo & {
  score: number;
};

const semverSchema = z.string().refine((value) => {
  return semver.valid(semver.coerce(value)) !== null;
}, "Invalid semver version");

const dependencySchema = z.record(semverSchema);

export const packageJsonSchema = z.object({
  dependencies: dependencySchema.optional(),
  devDependencies: dependencySchema.optional(),
});

export type DependencyObjectType = z.infer<typeof dependencySchema>;
export type PackageJsonType = z.infer<typeof packageJsonSchema>;
