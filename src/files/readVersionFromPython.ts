// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import childProcess from 'child_process';
import * as core from '@actions/core';

// TODO Catch errors and reject the promise if the function fails
export default async function readVersionFromPython(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
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
}
