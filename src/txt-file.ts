// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as fs from 'fs';
import * as core from '@actions/core';

export const readVersion = async (filename: string): Promise<string> =>
  new Promise((resolve, reject) => {
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

export const writeVersion = async (
  projectVersion: string,
  newVersion: string,
  filename: string,
): Promise<void> =>
  new Promise((resolve) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        core.warning(err);
      } else {
        const result = data.replace(projectVersion, newVersion);

        fs.writeFile(filename, result, 'utf8', (err) => {
          if (err) {
            core.warning(err);
          }
        });
      }
    });
    resolve();
  });
