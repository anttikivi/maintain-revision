// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as fs from "fs";
import * as path from "path";
import * as core from "@actions/core";

// TODO Catch errors and reject the promise if the function fails
export const readVersion = async (): Promise<string> =>
  new Promise(resolve => {
    const filename: string = path.join(
      process.env["GITHUB_WORKSPACE"] as string,
      "package.json"
    );
    const packageJson = require(filename);
    const version = packageJson.version;
    core.debug(
      "The version number field read from the package file is " + version
    );
    resolve(version);
  });

export const writeVersion = async (
  packageVersion: string,
  newVersion: string,
  suffix: string = ""
): Promise<void> =>
  new Promise(resolve => {
    const filename: string = path.join(
      process.env["GITHUB_WORKSPACE"] as string,
      "package.json"
    );
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
