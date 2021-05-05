// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import fs from 'fs';
import * as core from '@actions/core';

export default async function writeVersionToJSON(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

          console.log('Going to write the string', jsonString);

          fs.writeFile(filename, jsonString, 'utf8', (writeError) => {
            if (writeError) {
              core.warning(writeError);
            }
          });
        } else if (suffixVariable !== '') {
          core.debug(`The suffix variable variable is set to ${suffixVariable}`);

          jsonData[suffixVariable] = newSuffix;

          const jsonString = JSON.stringify(jsonData);

          console.log('Going to write the string', jsonString);

          fs.writeFile(filename, jsonString, 'utf8', (writeError) => {
            if (writeError) {
              core.warning(writeError);
            }
          });
        } else {
          jsonData.version = newVersion;

          const jsonString = JSON.stringify(jsonData);

          console.log('Going to write the string', jsonString);

          fs.writeFile(filename, jsonData, 'utf8', (writeError) => {
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
