// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as fs from 'fs';
import * as path from 'path';
import * as core from '@actions/core';
import * as jsonFile from './json-file';

// TODO Catch errors and reject the promise if the function fails
export const readVersion = async (): Promise<string> =>
  jsonFile.readVersion(path.join(process.env.GITHUB_WORKSPACE as string, 'package.json'));

export const writeVersion = async (packageVersion: string, newVersion: string): Promise<void> =>
  new Promise((resolve) => {
    const filename: string = path.join(process.env.GITHUB_WORKSPACE as string, 'package.json');
    fs.readFile(filename, 'utf8', (readError, data) => {
      if (readError) {
        core.warning(readError);
      } else {
        const result = data.replace(packageVersion, newVersion);

        fs.writeFile(filename, result, 'utf8', (writeError) => {
          if (writeError) {
            core.warning(writeError);
          }
        });
      }
    });
    resolve();
  });
