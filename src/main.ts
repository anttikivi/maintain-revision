// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as path from "path";
import * as core from "@actions/core";
import * as bucket from "./bucket";

const IS_WINDOWS = process.platform === "win32";
const IS_MAC = process.platform === "darwin";

const resolveDevelopmentVersion = async (
  bucketName: string,
  path: string
): Promise<number> => {
  const numberString = await bucket.readFile(bucketName, path);
  const versionNumber: number = parseInt(numberString) + 1;
  return versionNumber;
};

const uploadDevelopmentVersion = async (
  bucketName: string,
  path: string,
  version: number
): Promise<void> => bucket.putFile(bucketName, path, String(version));

export const run = async (
  readVersion: Function,
  writeVersion: Function
): Promise<void> => {
  if (IS_MAC) {
    core.setFailed("Unfortunately Maintain Revision doesn't support macOS yet");
  } else if (IS_WINDOWS) {
    core.setFailed(
      "Unfortunately Maintain Revision doesn't support Windows yet"
    );
  }

  try {
    const workspace = process.env["GITHUB_WORKSPACE"] as string;
    const versionFile = path.join(workspace, core.getInput("version-file"));

    core.info("Reading local version data from " + versionFile);

    // TODO Add support for project that don't use Node.js
    const projectVersion = await readVersion(versionFile);

    core.debug("The package version is " + projectVersion);

    const bucketName = core.getInput("bucket");
    const pathInput = core.getInput("path");
    const filePath =
      pathInput == "" ? await bucket.getDefaultPath(projectVersion) : pathInput;

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

    await writeVersion(projectVersion, version, versionFile);

    core.setOutput("version", version);

    core.saveState("filePath", filePath);
    core.saveState("versionNumber", versionNumber);
  } catch (error) {
    core.setFailed(error.message);
  }
};

export const upload = async () => {
  const bucketName = core.getInput("bucket");
  const filePath = core.getState("filePath");
  const versionNumber = parseInt(core.getState("versionNumber"));

  uploadDevelopmentVersion(bucketName, filePath, versionNumber);
};
