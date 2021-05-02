// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import * as fs from 'fs';
import * as core from '@actions/core';

export default async function writeVersionToTXTFile(
  projectVersion: string,
  newVersion: string,
  filename: string,
): Promise<void> {
  return new Promise((resolve) => {
    fs.readFile(filename, 'utf8', (readError, data) => {
      if (readError) {
        core.warning(readError);
      } else {
        const result = data.replace(projectVersion, newVersion);

        fs.writeFile(filename, result, 'utf8', (writeError) => {
          if (writeError) {
            core.warning(writeError);
          }
        });
      }
    });
    resolve();
  });
}
