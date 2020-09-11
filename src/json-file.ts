// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as fs from "fs";
import * as core from "@actions/core";

export async function readVersion(filename: string): Promise<string> {
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

export async function writeVersion(
  packageVersion: string,
  newVersion: string,
  filename: string
): Promise<void> {
  return new Promise(resolve => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        core.warning(err);
      } else {
        const result = data.replace(packageVersion, newVersion);

        fs.writeFile(filename, result, "utf8", err => {
          if (err) {
            core.warning(err);
          }
        });
      }
    });
    resolve();
  });
}
