// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as core from "@actions/core";

export async function readVersion(
  filename: string = "./package.json"
): Promise<string> {
  // TODO Catch errors and reject the promise if the function fails
  return new Promise(resolve => {
    const packageJson = require(filename);
    const version = packageJson.version;
    core.debug(
      "The version number field read from the package file is " + version
    );
    resolve(version);
  });
}
