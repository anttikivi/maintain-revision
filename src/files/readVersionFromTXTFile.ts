// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import * as fs from 'fs';
import * as core from '@actions/core';

export default async function readVersionFromTXTFile(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        core.warning(err);
        reject(err);
      } else {
        const result = data.trim();
        resolve(result);
      }
    });
  });
}
