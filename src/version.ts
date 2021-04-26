// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import * as core from '@actions/core';
import * as bucket from './bucket';

export const resolveManualRevisionNumber = async (): Promise<number> =>
  core.getInput('revision-number') ? parseInt(core.getInput('revision-number'), 10) : 0;

export const resolveDevelopmentVersion = async (
  bucketName: string,
  path: string,
): Promise<number> => {
  try {
    const download: boolean = core.getInput('download') === 'true';
    const manualNumberInput: string = core.getInput('revision-number');
    const manualNumber: number = manualNumberInput ? parseInt(manualNumberInput, 10) : 0;

    if (!download || manualNumber) {
      return manualNumber;
    }

    const fileExists = await bucket.fileExists(bucketName, path);

    if (fileExists) {
      const numberString = await bucket.readFile(bucketName, path);
      const versionNumber: number = parseInt(numberString, 10) + 1;
      return versionNumber;
    }

    return 0;
  } catch (err) {
    core.error(err);
    return -1;
  }
};
