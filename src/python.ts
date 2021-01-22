// Copyright (c) 2021 Antti Kivi
// Licensed under the MIT License

import * as childProcess from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as core from "@actions/core";

// TODO Catch errors and reject the promise if the function fails
export const readVersion = async (filename: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const python = childProcess.spawn("python", [filename]);

    python.stdout.on("data", data => {
      const result = String.fromCharCode.apply(null, data);
      resolve(result);
    });

    python.stderr.on("data", data => {
      core.warning(data);
      reject(data);
    });
  });

export const writeVersion = async (
  projectVersion: string,
  newVersion: string,
  filename: string,
  suffix: string = ""
): Promise<void> =>
  new Promise(resolve => {
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
