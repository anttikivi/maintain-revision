// Copyright (c) 2021 Antti Kivi
// Licensed under the MIT License

import childProcess from 'child_process';
import fs from 'fs';
import * as core from '@actions/core';

// TODO Catch errors and reject the promise if the function fails
export const readVersion = async (filename: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const python = childProcess.spawn('python', [filename]);

    python.stdout.on('data', (data) => {
      const result = String.fromCharCode.apply(null, data).trim();
      core.debug(`The version number field read from the Python file is ${result}`);
      resolve(result);
    });

    python.stderr.on('data', (data) => {
      core.warning(data);
      reject(data);
    });
  });

export const writeVersion = async (
  projectVersion: string,
  newVersion: string,
  filename: string,
  originalSuffix: string = '',
  newSuffix: string = '',
  variable: string = '',
): Promise<void> =>
  new Promise((resolve) => {
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
