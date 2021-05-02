// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import * as core from '@actions/core';

import readS3File from './readS3File';
import s3FileExists from './s3FileExists';

export default async function resolveDevelopmentVersionFromS3(
  bucketName: string,
  path: string,
): Promise<number> {
  try {
    const download: boolean = core.getInput('download') === 'true';
    const manualNumberInput: string = core.getInput('revision-number');
    const manualNumber: number = manualNumberInput ? parseInt(manualNumberInput, 10) : 0;

    if (!download || manualNumber) {
      return manualNumber;
    }

    const fileExists = await s3FileExists(bucketName, path);

    if (fileExists) {
      const numberString = await readS3File(bucketName, path);
      const versionNumber: number = parseInt(numberString, 10) + 1;
      return versionNumber;
    }

    return 0;
  } catch (err) {
    core.error(err);
    return -1;
  }
}
