// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import fs from 'fs';
import * as core from '@actions/core';

// TODO Catch errors and reject the promise if the function fails
export default async function readVersionFromJSON(
  filename: string,
  variable: string = '',
): Promise<string> {
  return new Promise((resolve) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        core.warning(err);
      } else if (variable !== '') {
        const jsonData = JSON.parse(data);
        core.debug(`The JSON data read from ${filename} is\n${JSON.stringify(jsonData, null, 2)}`);
        const versionData = jsonData[variable];
        core.debug(`The version number field read from the package file is ${versionData}`);
        resolve(versionData);
      } else {
        const jsonData = JSON.parse(data);
        core.debug(`The JSON data read from ${filename} is\n${JSON.stringify(jsonData, null, 2)}`);
        const { version } = jsonData;
        core.debug(`The version number field read from the package file is ${version}`);
        resolve(version);
      }
    });
  });
}
