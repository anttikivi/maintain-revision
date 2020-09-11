// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as fs from "fs";
import * as core from "@actions/core";

export async function readVersion(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        core.warning(err);
        reject(err);
      } else {
        const result = data.trim();
        resolve(result);
      }
    });
  });
}

export async function writeVersion(
  projectVersion: string,
  newVersion: string,
  filename: string
): Promise<void> {
  return new Promise(resolve => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        core.warning(err);
      } else {
        const result = data.replace(projectVersion, newVersion);

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
