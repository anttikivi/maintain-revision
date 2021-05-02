// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import fs from 'fs';
import * as core from '@actions/core';

export default async function writeVersionToPython(
  projectVersion: string,
  newVersion: string,
  filename: string,
  originalSuffix: string = '',
  newSuffix: string = '',
  variable: string = '',
): Promise<void> {
  return new Promise((resolve) => {
    core.debug(`Going to read a file from ${filename}`);
    fs.readFile(String(filename), 'utf8', (readError, data) => {
      if (readError) {
        core.warning(readError);
      } else if (variable) {
        core.debug('The suffix variable is set');
        const originalVariable = `${variable} = "-${originalSuffix}"`;
        core.debug(`The original variable statement is ${originalVariable}`);
        const newVariable = `${variable} = "-${newSuffix}"`;
        core.debug(`The new variable statement is ${newVariable}`);
        const result = data.replace(originalVariable, newVariable);
        core.debug(`The result is ${result}`);
        core.debug(`Going to write to ${filename}`);
        fs.writeFile(String(filename), result, 'utf8', (writeError) => {
          if (writeError) {
            core.warning(writeError);
          }
        });
      } else {
        core.debug('The suffix variable is not set');
        const result = data.replace(projectVersion, newVersion);
        core.debug(`The result is ${result}`);
        core.debug(`Going to write to ${filename}`);
        fs.writeFile(String(filename), result, 'utf8', (writeError) => {
          if (writeError) {
            core.warning(writeError);
          }
        });
      }
    });
    resolve();
  });
}
