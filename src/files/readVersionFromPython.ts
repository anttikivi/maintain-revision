// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import childProcess from 'child_process';
import path from 'path';
import * as core from '@actions/core';

// TODO Catch errors and reject the promise if the function fails
export default async function readVersionFromPython(filename: string, variable: string = '__version__'): Promise<string> {
  return new Promise((resolve, reject) => {
    core.debug(`The variable that will be used to read the value is ${variable}`);

    const python = childProcess.spawn('python', [path.join(__filename, '..', '..', 'util', 'read_version.py'), filename, variable]);

    python.stdout.on('data', (data) => {
      const versionData = String.fromCharCode.apply(null, data).trim();

      core.debug(`The version field read from the package file is ${versionData}`);
      resolve(versionData);
    });

    python.stderr.on('data', (data) => {
      core.warning(data);
      reject(data);
    });
  });
}
