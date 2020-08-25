// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as core from "@actions/core";
import * as bucket from "./bucket";
import * as pkg from "./package";

const IS_WINDOWS = process.platform === "win32";
const IS_MAC = process.platform === "darwin";

async function resolveDevelopmentVersion(
  bucketName: string,
  path: string
): Promise<number> {
  const numberString = await bucket.readFile(bucketName, path);
  const versionNumber: number = parseInt(numberString) + 1;
  return versionNumber;
}

async function uploadDevelopmentVersion(
  bucketName: string,
  path: string,
  version: number
): Promise<void> {
  bucket.putFile(bucketName, path, String(version));
}

export async function run(): Promise<void> {
  if (IS_MAC) {
    core.setFailed("Unfortunately Maintain Revision doesn't support macOS yet");
  } else if (IS_WINDOWS) {
    core.setFailed(
      "Unfortunately Maintain Revision doesn't support Windows yet"
    );
  }

  try {
    // TODO Add support for project that don't use Node.js
    const packageVersion = await pkg.readVersion();
    core.debug("The package version is " + packageVersion);

    const bucketName = core.getInput("bucket");
    const pathInput = core.getInput("path");
    const filePath =
      pathInput == "" ? await pkg.getDefaultPath(packageVersion) : pathInput;

    const fileExists = await bucket.fileExists(bucketName, filePath);

    const versionNumber: number = fileExists
      ? await resolveDevelopmentVersion(bucketName, filePath)
      : 1;

    core.info(
      "The development version number for the current run is " + versionNumber
    );

    const version: string = packageVersion.replace(
      "-dev",
      "-dev." + versionNumber
    );

    await pkg.writeVersion(packageVersion, version);

    uploadDevelopmentVersion(bucketName, filePath, versionNumber);
  } catch (error) {
    core.setFailed(error.message);
  }
}
