// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as path from "path";
import * as core from "@actions/core";
import * as bucket from "./bucket";

const resolveDevelopmentVersion = async (
  bucketName: string,
  path: string
): Promise<number> => {
  try {
    const numberString = await bucket.readFile(bucketName, path);
    const versionNumber: number = parseInt(numberString) + 1;
    return versionNumber;
  } catch (err) {
    console.error(err);
    return -1;
  }
};

const uploadDevelopmentVersion = async (
  bucketName: string,
  path: string,
  version: number
): Promise<void> => bucket.putFile(bucketName, path, String(version));

export const run = async (
  readVersion: Function,
  writeVersion: Function,
  isNpm: boolean = false,
  isPython: boolean = false
): Promise<void> => {
  try {
    const workspace = process.env["GITHUB_WORKSPACE"] as string;
    const versionFile = path.join(workspace, core.getInput("file"));
    const isRelease = core.getInput("release") === "true";

    core.info("Reading local version data from " + versionFile);

    const projectVersion = isNpm
      ? await readVersion()
      : await readVersion(versionFile);

    core.debug("The package version is " + projectVersion);

    if (isRelease) {
      core.setOutput("version", projectVersion);
    } else {
      const bucketName = core.getInput("bucket");
      const pathInput = core.getInput("path");
      const suffix = core.getInput("suffix");
      const suffixVariable = core.getInput("variable");
      const filePath =
        pathInput == ""
          ? await bucket.getDefaultPath(projectVersion)
          : pathInput;

      const fileExists = await bucket.fileExists(bucketName, filePath);

      const versionNumber: number = fileExists
        ? await resolveDevelopmentVersion(bucketName, filePath)
        : 1;

      core.info(
        "The development version number for the current run is " + versionNumber
      );

      const version: string = projectVersion.replace(
        "-dev",
        "-dev." + versionNumber
      );

      if (isNpm) {
        await writeVersion(projectVersion, version);
      } else if (isPython) {
        await writeVersion(projectVersion, version);
      } else {
        await writeVersion(projectVersion, version, versionFile);
      }

      core.saveState("filePath", filePath);
      core.saveState("versionNumber", versionNumber);

      core.setOutput("version", version);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

export const upload = async () => {
  const shouldUpload = core.getInput("upload") === "true";
  const isRelease = core.getInput("release") === "true";

  if (shouldUpload && !isRelease) {
    const bucketName = core.getInput("bucket");
    const filePath = core.getState("filePath");
    const versionNumber = parseInt(core.getState("versionNumber"));

    uploadDevelopmentVersion(bucketName, filePath, versionNumber);
  } else {
    core.info("Uploading the next development version number is disabled");
  }
};
