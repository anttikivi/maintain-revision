// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as core from "@actions/core";

export async function readPackageVersion(
  filename: string = "./package.json"
): Promise<string> {
  return new Promise(resolve => {
    const packageJson = require(filename);
    const version = packageJson.version;
    core.info("The version number read from the package file is " + version);
    resolve(version);
  });
}
