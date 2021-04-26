// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import * as core from '@actions/core';
import * as bucket from './bucket';

const resolveS3DevelopmentVersion = async (bucketName: string, path: string): Promise<number> => {
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

export const resolveManualRevisionNumber = async (): Promise<number> =>
  core.getInput('revision-number') ? parseInt(core.getInput('revision-number'), 10) : 0;

export const resolveDevelopmentVersion = async (
  service: string,
  bucketName: string,
  path: string,
): Promise<number> => {
  if (service === 's3') {
    return resolveS3DevelopmentVersion(bucketName, path);
  }

  core.error(`The storage service is invalid: '${service}'`);

  return -1;
};
