// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import fs from 'fs';
import * as core from '@actions/core';

// TODO Catch errors and reject the promise if the function fails
export default async function readVersionFromJSON(
  filename: string,
  variable: string = 'version',
): Promise<string> {
  return new Promise((resolve) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        core.warning(err);
      } else {
        const jsonData = JSON.parse(data);

        core.debug(`The variable that will be used to read the value is ${variable}`);

        const versionData = jsonData[variable];

        core.debug(`The value of the version field read from the JSON file is ${versionData}`);
        resolve(versionData);
      }
    });
  });
}
