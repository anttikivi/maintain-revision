// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import * as fs from 'fs';
import * as core from '@actions/core';

// The text files cannot have
export default async function readVersionFromTXTFile(filename: string, variable?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        core.warning(err);
        reject(err);
      } else {
        const versionData = data.trim();

        core.debug(`The version field read from the text file is ${versionData}`);
        resolve(versionData);
      }
    });
  });
}
