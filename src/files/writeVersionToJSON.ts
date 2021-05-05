// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import fs from 'fs';
import * as core from '@actions/core';

export default async function writeVersionToJSON(
  packageVersion: string,
  newVersion: string,
  filename: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  originalSuffix: string = '',
  newSuffix: string = '',
  variable: string = '',
  suffixVariable: string = '',
): Promise<void> {
  return new Promise((resolve) => {
    core.debug(`Going to read a file from ${filename}`);

    fs.readFile(filename, 'utf8', (readError, data) => {
      if (readError) {
        core.warning(readError);
      } else {
        const jsonData = JSON.parse(data);

        console.log(
          'Going to write to the version',
          newVersion,
          'to',
          filename,
          'with the JSON data',
          jsonData,
        );

        if (variable !== '') {
          core.debug(`The version variable variable is set to ${variable}`);

          jsonData[variable] = newVersion;

          const jsonString = JSON.stringify(jsonData);

          fs.writeFile(filename, jsonString, 'utf8', (writeError) => {
            if (writeError) {
              core.warning(writeError);
            }
          });
        } else if (suffixVariable !== '') {
          core.debug(`The suffix variable variable is set to ${suffixVariable}`);

          jsonData[suffixVariable] = newSuffix;

          const jsonString = JSON.stringify(jsonData);

          fs.writeFile(filename, jsonString, 'utf8', (writeError) => {
            if (writeError) {
              core.warning(writeError);
            }
          });
        } else {
          const result = data.replace(packageVersion, newVersion);

          fs.writeFile(filename, result, 'utf8', (writeError) => {
            if (writeError) {
              core.warning(writeError);
            }
          });
        }
      }
    });
    resolve();
  });
}
